module.exports = class Playlist {
    static async route(request, response) {
        if (!request.url.startsWith('/playlist')) return false;
        if (this[request.method.toLowerCase()])
            return await this[request.method](request, response)
        else
            return notFound(request, response)
    }
    static async get(request, response) {
        log('Retrieving playlist')
        const playlist = await readFile(this.playlistPath)

        response.writeHead(200, {
            'Content-Type': 'application/json',
            'Content-Length': playlist.byteLength
        })

        response.write(playlist)
        response.end()
        return true
    }
    static async post(request, response) {
        log('Creating playlist')
        if (!request.readable) return badRequest(request, response)

        const body = request.read()

        await writeFile(this.playlistPath, body, { encoding: 'utf-8' })
        response.writeHead(200)
        response.end()
        return true
    }
    static get playlistPath() {
        return resolve(localPath, '.s3-music-player_playlist.json')
    }
}
