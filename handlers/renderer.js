const { isDebug, getUrlArray, bucketName } = require('../util')
const { loadLayout, ClientLibrary, EventLibrary } = require('../ui')
const MusicFile = require('../classes/MusicFile')

let data = undefined

module.exports = async (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })

    if (isDebug) console.log('Rendering library')
    
    if (data === undefined || isDebug) {
        data = Object.assign({}, await loadLayout())
    }

    const { layout, player, library, style } = data

    const urls = await getUrlArray()

    let musicLibrary = {}
    urls.forEach(url => musicLibrary[url] = new MusicFile(url))

    response.end(layout({
        player,
        library,
        style,
        bucketName,
        libraryData: () => ({ data: musicLibrary }),
        EventLibrary,
        ClientLibrary
    }))
}