module.exports = class {
    constructor() {
        this.filterLibrary = this.debounce(searchKey => {
            const allTracks = document.querySelectorAll("tbody tr");
            allTracks.forEach(track => {
                track.dataset.url.toLowerCase().includes(searchKey.toLowerCase())
                    ? track.style.display = "table-row"
                    : track.style.display = "none"
            })
        }, 350)
    }


    DOMSetup() {
        this.gatherElements()

        window.progressContainer.onmousemove = window.eventLibrary.progressContainer.onmousemove
        window.progressContainer.onmouseleave = this.registerTrackTime

        window.audio.onplaying = this.registerTrackTime
        window.audio.onplay = window.eventLibrary.audio.onplay

        window.setProgressText = text => window.progressTime.innerHTML = text

        return this
    }


    gatherElements() {
        window.progressContainer = document.querySelector('.progress__container')
        window.progressIndicator = document.querySelector('.progress__cursor')
        window.progressBar = document.querySelector('.progress__bar')
        window.progressTime = document.querySelector('.progress__time')
    }


    debounce(fn, delay) {
        var timeoutId
        return function debounced() {
            const that = this,
                args = arguments
            if (timeoutId) {
                window.clearTimeout(timeoutId)
            }
            timeoutId = window.setTimeout(fn.apply(that, args), delay)
        }
    }


    registerTrackTime() {
        window.audio.ontimeupdate = window.eventLibrary.audio.ontimeupdate
        window.progressContainer.onmousedown = window.eventLibrary.progressContainer.onmousedown
    }


    clearTrackTimeInterval() {
        window.clearTimeout(window.timeIntervalId)
    }


    padSeconds(seconds) {
        return seconds.length === 1 ? `0${seconds}` : seconds
    }


    formatSeconds(seconds) {
        const min = Math.floor(seconds / 60)
        const secs = Math.floor(seconds - (Math.floor(seconds / 60) * 60))
        
        return `${min}:${this.padSeconds(secs.toString())}`
    }


    get currentTimeDisplay() {
        return this.formatSeconds(window.audio.currentTime)
    }

    get durationDisplay() {
        return this.formatSeconds(window.audio.duration)
    }


    setNowPlaying(clickedRow) {
        document.querySelector(".playing")
            ? document.querySelector(".playing").classList.remove("playing")
            : null;
        clickedRow.classList.add("playing");
        const trackDetails = clickedRow.querySelectorAll("td"),
            artist = trackDetails[0].innerHTML,
            album = trackDetails[1].innerHTML,
            track = trackDetails[2].innerHTML;
        document.querySelector(".player__text").innerHTML = `${artist} / ${album} / ${track}`;
        document.querySelector("title").innerHTML = `${track}`;
        document.querySelector(".player__symbol").innerHTML = "pause";
        window.audio.src = clickedRow.dataset.url;
        window.audio.play();
    }


    togglePausePlay() {
        const pauseOrPlay = document.querySelector(".player__symbol");
        if (pauseOrPlay.innerHTML !== "equalizer") {
            pauseOrPlay.innerHTML === "play_arrow"
                ? (pauseOrPlay.innerHTML = "pause",
                    window.audio.play())
                : (pauseOrPlay.innerHTML = "play_arrow",
                    window.audio.pause())
        }
    }
}