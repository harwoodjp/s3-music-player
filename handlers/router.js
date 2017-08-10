const renderer = require('./renderer')

module.exports = async (request, response) => {
    switch (request.url) {
        default:
        case '/':
            return renderer(request, response)
    }
}