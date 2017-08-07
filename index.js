const { resolve } = require('path');
const { readFile, readFileSync } = require('fs');
const http = require('http');
const port = 3000;
require('dotenv').config();

const _ = require('lodash'),
    sass = require('node-sass');


const config = require("./config"),
    MusicFile = require('./classes/MusicFile');

// reading html from fs, converting to template
let layout, player, library, style;
function loadLayout() {
    layout = _.template(readFileSync("./ui/layout.html")),
    player = _.template(readFileSync("./ui/player.html")),
    library = _.template(readFileSync("./ui/library.html")),
    style = _.template(sass.renderSync({ 
        data: _.template(readFileSync("./ui/style.scss"))(), outputStyle: 'compressed'
    }).css.toString());
}
loadLayout();



const requestHandler = (request, response) => {  

    if (process.env.DEBUG) { 
        console.log(request.url);    
        loadLayout();
    }
    
    config.listBucketObjects.then(data => {
        const urls = config.getUrlArray(data);
        response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });     
        
        let musicMap = {};
        urls.forEach(url => {
            const musicFile = new MusicFile(url);
            musicMap[url] = musicFile;
        })

        response.end(layout({ 
            player,
            library,
            style,
            libraryData: function() {
                return { data: musicMap }
            },
            helperFunctions: function() {
                return {
                    filterLibrary: searchKey => {
                        const allTracks = document.querySelectorAll("tbody tr");
                        allTracks.forEach(track => {
                            console.log(track)
                            track.dataset.url.toLowerCase().includes(searchKey.toLowerCase())
                                ? track.style.display = "table-row"
                                : track.style.display = "none"
                        })
                    },
                    setNowPlaying: clickedRow => {
                        document.querySelector(".playing") 
                            ? document.querySelector(".playing").classList.remove("playing")
                            : null;
                        clickedRow.classList.add("playing");
                        const trackDetails = clickedRow.querySelectorAll("td"),
                            artist = trackDetails[0].innerHTML,
                            album = trackDetails[1].innerHTML,
                            track = trackDetails[2].innerHTML;
                        document.querySelector(".player__text").innerHTML = `${artist} / ${album} / ${track}`;
                        document.querySelector(".player__symbol").innerHTML = "pause";
                        window.audio.src = clickedRow.dataset.url;
                        window.audio.play();
                    },
                    togglePausePlay: () => {
                        const pauseOrPlay = document.querySelector(".player__symbol");
                        pauseOrPlay.innerHTML === "play_arrow" 
                            ? (pauseOrPlay.innerHTML = "pause",
                                window.audio.play())
                            : (pauseOrPlay.innerHTML = "play_arrow",
                                window.audio.pause())
                    }
                }
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
