module.exports = class {
    constructor() {
        this.audio = {
            onplay() {
                window.setProgressText('')
                window.progressContainer.onmousemove({ clientX: 0 })
                window.timeIntervalId = window.setInterval(() => {
                    const text = `${
                        window.clientLibrary.currentTimeDisplay
                        } / ${
                        window.clientLibrary.durationDisplay
                    }`

                    window.setProgressText(text.indexOf('NaN') === -1 ? text : '')
                }, 1000)
                window.audio.onended = window.eventLibrary.audio.onended
                window.audio.onpause = () => window.clearTimeout(window.timeIntervalId)
            },

            onended() {
                window.clearTimeout(window.timeIntervalId)

                const nextTrack = document.querySelector(".playing").nextElementSibling
                window.clientLibrary.setNowPlaying(nextTrack)
                window.audio.src = nextTrack.dataset.url
                window.audio.play()
            },

            ontimeupdate(event) {
                const { duration, currentTime } = window.audio
                const progress = (currentTime / duration) * 100
                Object.assign(window.progressBar.style, {
                    width: `${progress.toFixed(2)}%`
                })
            }
        }

        this.progressContainer = {
            onmousemove(event) {
                if (!window.audio.paused) {
                    window.audio.ontimeupdate = null
                    const { clientX: x } = event
                    const { width: totalWidth } = window.progressContainer.getBoundingClientRect()

                    Object.assign(window.progressIndicator.style, {
                        transform: `translateX(${x}px)`,
                        display: 'initial'
                    })
                    Object.assign(window.progressBar.style, {
                        width: `${((x) / totalWidth).toFixed(8) * 100}%`
                    })
                }
            },

            onmousedown(event) {
                const { clientX: x } = event
                const { width: totalWidth } = window.progressContainer.getBoundingClientRect()
                window.audio.currentTime = window.audio.duration * parseFloat((x / totalWidth).toFixed(4))
            }
        }
    }
}