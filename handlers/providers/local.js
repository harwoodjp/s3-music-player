const { promisify } = require('util')
const fs = require('fs')
const { resolve } = require('path')

const { log, isDebug, mime } = require('../../util')
const { isPathValid } = require('../../providers').getUrlArray
const notFound = require('../notFound')

const readFile = promisify(fs.readFile)

const {
    LOCAL_PROVIDER_ABSOLUTE_PATH: localPath,
    LOCAL_PROVIDER_BASE_URL: baseUrl
} = process.env

module.exports = async (request, response) => {
    if (!request.url.startsWith('/music')) return 0
    if (request.method !== 'GET') return notFound(request, response)

    const filePath = resolve(localPath, decodeURI(request.url.split('/').slice(-3).join('/')))

    try {
        const file = await readFile(filePath)

        response.writeHead(200, {
            'Content-Type': mime.get(filePath),
            'Content-Length': file.byteLength
        })

        response.write(file)
        response.end()
        return true
    } catch (e) {
        response.writeHead(500)
        response.end(`Error reading file ${filePath}: ${e.message}`)
    }
}
