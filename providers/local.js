const { promisify } = require('util')
const fs = require('fs')
const { resolve } = require('path')

const { log, isDebug } = require('../util')

const stat = promisify(fs.stat)
const readFile = promisify(fs.readFile)
const readdir = promisify(fs.readdir)
const writeFile = promisify(fs.writeFile)

const localPath = process.env.LOCAL_PROVIDER_ABSOLUTE_PATH
const baseUrl = process.env.LOCAL_PROVIDER_BASE_URL

const data = {}

async function getUrlArray(shouldRefresh = false) {
    if (data.urlArray === undefined || shouldRefresh) {
        log(`${data.urlArray ? 'Refreshing' : 'Building'} local file url array.`)
        data.urlArray = await crawlDirectory()
    }

    if (isDebug) {
        const contentsPath = resolve(__dirname, 'contents_debug.json')
        log(`Writing contents_debug file to ${contentsPath}`)
        await writeFile(contentsPath, JSON.stringify(data.urlArray, x => x, 4))
    }

    return data.urlArray
}

async function crawlDirectory(path = localPath) {
    let paths = [];
    const files = await readdir(localPath)
    files.forEach(file => {
        const stats = await stat(file)
        if (stats.isDirectory()) {
            paths = [...paths, await crawlDirectory(file)]
        }

        paths = [...paths, file]
    })

    return paths.map(localPathToUrl)
}

function localPathToUrl(path) {
    return `${baseUrl}${path.slice(localPath.length)}`
}

module.exports = getUrlArray
