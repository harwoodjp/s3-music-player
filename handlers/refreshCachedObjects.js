const { isDebug, getUrlArray } = require('../providers')

module.exports = async (request, response) => {
    response.writeHead(200)

    if (isDebug) console.log('Refreshing object cache')
    
    await getUrlArray(true)

    response.end()
}
