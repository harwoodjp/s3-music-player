const { promisify } = require('util')
const fs = require('fs')
const { resolve } = require('path')

const { log, isDebug } = require('../../util')
const { isPathValid } = require('../../providers').getUrlArray
const notFound = require('../notFound')

const stat = promisify(fs.stat)
const read = promisify(fs.read)
const open = promisify(fs.open)
const createReadStream = promisify(fs.createReadStream)

const {
    LOCAL_PROVIDER_ABSOLUTE_PATH: localPath,
    LOCAL_PROVIDER_BASE_URL: baseUrl
} = process.env

module.exports = async (request, response) => {
    if (!request.url.startsWith('/music')) return 0
    if (request.method !== 'GET') return notFound(request, response)

    const filePath = resolve(localPath, decodeURI(request.url.split('/').slice(-3).join('/')))

    try {
        const stats = await stat(filePath)
        const readable = await createReadStream(filePath)

        readable.on('data', chunk => {
            log(`Read ${chunk.length} from ${filePath}`)
            response.write(chunk)
        })

        readable.on('end', () => {
            reponse.writeHead(200, {
                'Content-Type': 'audio/mpeg'
            })
            response.end()
        })
    } catch (e) {
        response.writeHead(500)
        response.end(`Error reading file ${filePath}: ${e.message}`)
    }
}
