const { isDebug, log } = require('../util')

module.exports = (request, response) => {
    response.writeHead(400)

    log(`${request.method} - ${request.url} - BAD REQUEST 404`)

    response.end()
}