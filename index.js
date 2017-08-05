const { resolve } = require('path')
const { readFile } = require('fs')
const http = require('http')  
const port = 3000
require('dotenv').config()

const player = require("./player")

const MusicFile = require('./MusicFile')

const ths = [
    'Artist',
    'Album',
    'Track'
]

const requestHandler = (request, response) => {  
    console.log(request.url)
    player.listBucketObjects.then(data => {
        readFile(resolve(__dirname, 'player.html'), { encoding: 'utf-8' }, (err, playerTemplate) => {
            if (err) response.end(err.message);

            const urls = player.getUrlArray(data)
            console.log(urls)
    
            let renderString = `<doctype! html><html><body>${playerTemplate}<table id="library"><thead><tr>${ths.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>`

            let musicMap = {};
            urls.forEach(url => {
                if (url.endsWith('mp3')) {
                    const musicFile = new MusicFile(url);
                    musicMap[url] = musicFile;
                    renderString += musicFile.tableRow;
                }
            })
          
            renderString += `</tbody></table><script>window.MusicFiles = ${JSON.stringify(musicMap)}</script>`
    
            renderString += `</body></html>`
            response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })
            response.end(renderString)
        })
    })
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {  
    if (err) {
        return console.log('Error: ', err)
    }

    console.log(`Server is listening on ${port}`)
})
