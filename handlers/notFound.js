const { isDebug, log } = require('../util')

module.exports = (request, response) => {
    response.writeHead(404)

    log(`${request.method} - ${request.url} - NOT FOUND 404`)
    
    response.end()
}
