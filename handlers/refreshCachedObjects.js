const { isDebug, getUrlArray } = require('../util')

module.exports = async (request, response) => {
    response.writeHead(200)

    if (isDebug) console.log('Refreshing object cache')
    
    await getUrlArray(true)

    response.end()
}
