module.exports = class MusicFile {
    constructor({
        url,
        artist,
        album,
        title,
        track
    }) {
        this.url = url
        this.artist = artist
        this.album = album
        this.trackTitle = title
        this.track = track
    }

    get audioControlElement() {
        return `
            <audio controls>
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
