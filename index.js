const { resolve } = require('path');
const { readFile, readFileSync } = require('fs');
const http = require('http');
const port = 3000;
require('dotenv').config();

const _ = require('lodash'),
    sass = require('node-sass');


const config = require("./config");

const MusicFile = require('./classes/MusicFile');

const ths = ['Artist', 'Album', 'Track'];


// reading html from fs, converting to template
let styleSrc = _.template(readFileSync("./ui/style.scss"));
let layout = _.template(readFileSync("./ui/layout.html")),
    player = _.template(readFileSync("./ui/player.html")),
    library = _.template(readFileSync("./ui/library.html")),
    style = _.template(sass.renderSync({ data: styleSrc(), outputStyle: 'compressed'}).css.toString());



const requestHandler = (request, response) => {  

    if (process.env.DEBUG) { 
        console.log(request.url);    
        // allows templates/SCSS to update on refresh            
        layout = _.template(readFileSync("./ui/layout.html")),
        player = _.template(readFileSync("./ui/player.html")),
        library = _.template(readFileSync("./ui/library.html")),        
        styleSrc = _.template(readFileSync("./ui/style.scss"));    
        style = _.template(sass.renderSync({ data: styleSrc(), outputStyle: 'compressed'}).css.toString());
    }
    
    config.listBucketObjects.then(data => {
        const urls = config.getUrlArray(data);
        response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });     
        
        let musicMap = {};
        urls.forEach(url => {
            const musicFile = new MusicFile(url);
            musicMap[url] = musicFile;
        })
        console.log(musicMap)


        response.end(layout({ 
            player: player,
            library: library,
            style: style,
            libraryData: function() {
                return { data: musicMap }
            }
        }));
    });
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {  
    if (err) {
        return console.log('Error: ', err);
    }
    console.log(`Server is listening on ${port}`);
})
