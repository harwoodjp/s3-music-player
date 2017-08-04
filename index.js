const http = require('http')  
const port = 3000
require('dotenv').config()

const player = require("./player")

const MusicFile = require('./MusicFile')

const requestHandler = (request, response) => {  
    console.log(request.url);
    player.listBucketObjects.then(data => {
        const urls = player.getUrlArray(data)
        console.log(urls)

        let renderString = `
            <doctype! html>
            <html>
            <body>
        `

        const music = urls.map(url => new MusicFile(url))
        
        music.forEach(song => {
            if (song.url.includes('mp3')) {
                renderString += song.audioControlElement
            }
        })

        renderString += `</body></html>`
        response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })
        response.end(renderString)
    });
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {  
    if (err) {
        return console.log('Error: ', err)
    }

    console.log(`Server is listening on ${port}`)
})

/* test */
