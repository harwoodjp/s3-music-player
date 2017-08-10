const { isDebug } = require('../util')

module.exports = (request, response) => {
    response.writeHead(404)

    if (isDebug) console.log(`${request.method} - ${request.url} - NOT FOUND 404`)
    
    response.end()
}
