const renderer = require('./renderer')
const refreshCachedObjects = require('./refreshCachedObjects')
const notFound = require('./notFound')
const provider = require('./providers')

module.exports = async (request, response) => {
    try {
        if (await provider(request, response)) return 1

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
