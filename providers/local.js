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
        data.paths = await crawlDirectory()
        data.urlArray = data.paths.reduce((acc, path) =>
            isPathValid(path) ? [...acc, `${baseUrl}/music/${path.split('/').slice(-3).join('/')}`] : [...acc],
            [])

        if (isDebug) {
            const contentsPath = resolve(__dirname, '../contents_debug.json')
            log(`Writing contents_debug file to ${contentsPath}`)
            await writeFile(contentsPath, JSON.stringify(data.urlArray, undefined, 4))
    
            const pathsPath = resolve(__dirname, '../paths_debug.json')
            log(`Writing paths_debug file to ${pathsPath}`)
            await writeFile(pathsPath, JSON.stringify(data.paths, undefined, 4))
        }
    }

    return data.urlArray
}

async function crawlDirectory(path = localPath, paths = []) {
    const files = await readdir(path)
    await Promise.all(files.map(async file => {
        let stats;
        try {
            stats = await stat(resolve(path, file))
        } catch (e) {
            return Promise.resolve()
        }

        if (stats.isDirectory()) {
            const p = await crawlDirectory(resolve(path, file), paths)
            paths = [...paths, ...p]
        } else {
            paths = [...paths, resolve(path, file)]
        }
    }))
    return paths
}

function isPathValid(path) {
    const is = path.endsWith('.mp3')
        || path.endsWith('.m4a')
        || path.endsWith('.flac')
        || path.endsWith('.ogg')
    
    if (!is && !path.endsWith('.DS_Store')) log(`Invalid extension! ${path}`)

    return is
}

getUrlArray.isPathValid = isPathValid;

module.exports = getUrlArray
