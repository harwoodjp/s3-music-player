const renderer = require('./renderer')
const refreshCachedObjects = require('./refreshCachedObjects')
const notFound = require('./notFound')

module.exports = async (request, response) => {
    try {
        switch (request.url) {
            case '/':
                if (request.method === 'GET') return renderer(request, response)
                break
            case '/cache':
                if (request.method === 'PUT') return refreshCachedObjects(request, response)
            default:
                return notFound(request, response)
        }

        return notFound(request, response)
    } catch (e) {
        response.writeHead(500)
        response.end(JSON.stringify(e))
    }
}