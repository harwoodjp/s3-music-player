module.exports = class MusicFile {
    constructor(
        url,
        config) {
        this.url = url

        if (!config) {
            this.artist = this.url.split('/')[4]
            this.album = this.url.split('/')[5]
            this.trackTitle = this.url.split('/')[6]
        } else {
            this.artist = config.artist
            this.album = config.album
            this.trackTitle = config.title
            this.track = config.track
        }
    }

    get audioControlElement() {
        return `
            <audio controls id="${this.url}">
                <source src="${this.url}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
            ${this.artist} -
            ${this.album} - 
            ${this.trackTitle}
        <br>
        `
    }
}
