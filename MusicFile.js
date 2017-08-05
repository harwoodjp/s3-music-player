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
            Object.assign(this, config);
        }

        this.marqueeText = `${this.artist} - ${this.album} - ${this.trackTitle}`
    }

    get audioControlElement() {
        return `
            <!--
            <audio controls id="${this.url}" played>
                <source src="${this.url}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
                -->
            ${this.artist} -
            ${this.album} - 
            ${this.trackTitle}
        <br>
        `
    }

    get tableRow() {
        return `<tr id=${JSON.stringify(this.url)} class="track" onclick="setCurrentTrack(\`${this.url}\`)">
                <td class="tracklist__artist">${this.artist}</td>
                <td class="tracklist__album">${this.album}</td>
                <td class="tracklist__song">${this.trackTitle}</td></tr>`
    }
}
