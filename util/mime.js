module.exports = class MimeTypes {
    static get mp3() { return 'audio/mpeg' }
    static get m4a() { return this.mp3 }
    static get aif() { return 'audio/aiff' }
    static get aiff() { return this.aif }
    static get aifc() { return this.aif }
    static get ogg() { return 'application/ogg' }
    static get wav() { return 'audio/wav' }
    static get flac() { return 'audio/x-flac' }
    static get default() { return 'application/octet-stream' }
    static get(path) {
        return this[path.slice(-3)] || this[path.slice(-4)] || this.default
    }
    static isValid(path) {
        return this.get(path) !== this.default
    }
}
