const { promisify } = require('util')
const fs = require('fs')

const { log, isDebug } = require('../util')

const stat = promisify(fs.stat)
const readFile = promisify(fs.readFile)
const readdir = promisify(fs.readdir)

const localPath = process.env.LOCAL_PROVIDER_ABSOLUTE_PATH
const baseUrl = process.env.LOCAL_PROVIDER_BASE_URL

const data = {}

async function getUrlArray(shouldRefresh = false) {
    if (data.urlArray === undefined || shouldRefresh) {
        data.urlArray = await crawlDirectory()
    }

    return data.urlArray
}

async function crawlDirectory(path = localPath) {
    let paths = [];
    const files = await readdir(localPath)
    files.forEach(file => {
        const st = await stat(file)
        if (st.isDirectory()) {
            paths = [...paths, await crawlDirectory(file)]
        }

        paths = [...paths, file]
    })

    return localPathToUrl(paths)
}

function localPathToUrl(paths) {
    return paths.map(path => `${baseUrl}${path.slice(localPath.length)}`)
}

module.exports = getUrlArray
