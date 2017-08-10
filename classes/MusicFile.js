module.exports = class MusicFile {
    constructor(
        url,
        config
    ) {
        this.url = url

        if (!config) {
            this.artist = this.url.split('/')[4]
            this.album = this.url.split('/')[5]
            this.trackTitle = this.url.split('/')[6]
        } else {
            Object.assign(this, config)
        }

        this.fullText = `${this.artist} - ${this.album} - ${this.trackTitle}`
    }
}
