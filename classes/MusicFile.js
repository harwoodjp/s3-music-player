module.exports = class MusicFile {
    constructor(
        url,
        config
    ) {
        this.url = url

        if (!config) {
            const split = this.url.split('/')
            this.artist = split.splice(-3, -2)
            this.album = split.slice(-2, -1)
            this.trackTitle = split.slice(-1)
        } else {
            Object.assign(this, config)
        }

        this.fullText = `${this.artist} - ${this.album} - ${this.trackTitle}`
    }
}
