const { listBucketObjects, isDebug, getUrlArray } = require('../util')
const { loadLayout, ClientLibrary, EventLibrary } = require('../ui')
const MusicFile = require('../classes/MusicFile')
const { BUCKET: bucketName } = process.env

let data = undefined;

module.exports = async (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })

    if (isDebug) console.log('rendering...')
    
    if (data === undefined || isDebug) {
        data = Object.assign({}, await loadLayout())
    }

    const { layout, player, library, style } = data

    const bucketObjects = await listBucketObjects
    const urls = getUrlArray(bucketObjects)

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