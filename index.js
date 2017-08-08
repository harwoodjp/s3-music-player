const { resolve } = require('path');
const { readFile, readFileSync } = require('fs');
const http = require('http');
const port = 3000;
require('dotenv').config();

const _ = require('lodash'),
    sass = require('node-sass');


const config = require("./config"),
    MusicFile = require('./classes/MusicFile');

// reading html from fs, converting to template
let layout, player, library, style;
function loadLayout() {
    layout = _.template(readFileSync("./ui/layout.html")),
    player = _.template(readFileSync("./ui/player.html")),
    library = _.template(readFileSync("./ui/library.html")),
    style = _.template(sass.renderSync({ 
        data: _.template(readFileSync("./ui/style.scss"))(), outputStyle: 'compressed'
    }).css.toString());
}
loadLayout();



const requestHandler = (request, response) => {  

    if (process.env.DEBUG) { 
        console.log(request.url);    
        loadLayout();
    }
    
    config.listBucketObjects.then(data => {
        const urls = config.getUrlArray(data);
        response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });     
        
        let musicMap = {};
        urls.forEach(url => {
            const musicFile = new MusicFile(url);
            musicMap[url] = musicFile;
        })

        response.end(layout({ 
            player,
            library,
            style,
            libraryData: function() {
                return { data: musicMap }
            },
            helperFunctions: function () {
                function debounce (fn, delay) {
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
                function registerTrackTime() {
                    window.audio.ontimeupdate = event => {
                        const { duration, currentTime } = window.audio
                        const progress = (currentTime / duration) * 100
                        Object.assign(window.progressBar.style, {
                            width: `${progress.toFixed(2)}%`
                        })
                    }
                    window.progressContainer.onmousedown = event => {
                        const { clientX: x } = event
                        const { width: totalWidth } = window.progressContainer.getBoundingClientRect()
                        window.audio.currentTime = window.audio.duration * parseFloat((x / totalWidth).toFixed(4))
                    }
                }
                function setup() {
                    window.progressContainer = document.querySelector('.progress__container')
                    window.progressIndicator = document.querySelector('.progress__cursor')
                    window.progressBar = document.querySelector('.progress__bar')
                    window.progressTime = document.querySelector('.progress__time')

                    window.progressContainer.onmousemove = event => {
                        if (!window.audio.paused) {
                            window.audio.ontimeupdate = null;
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
                    }
                    window.progressContainer.onmouseleave = () => {
                        registerTrackTime()
                    }
                    window.audio.onplaying = registerTrackTime
                    window.audio.onplay = () => {
                        window.progressContainer.onmousemove({ clientX: 0 })
                        window.timeIntervalId = window.setInterval(() => {
                            window.progressTime.innerHTML = `${
                                window.helperFunctions().currentTimeDisplay
                                } / ${
                                window.helperFunctions().durationDisplay
                                }`
                        }, 1000)
                        window.audio.onended = window.audio.onpause = () => window.clearTimeout(window.timeIntervalId)
                    }
                }
                const padSeconds = seconds => seconds.length === 1 ? `0${seconds}` : seconds
                const formatSeconds = seconds => `${
                    Math.floor(seconds / 60)
                    }:${
                    padSeconds(Math.floor(seconds - (Math.floor(seconds / 60) * 60)).toString())
                }`
                return {
                    setup,
                    registerTrackTime,
                    filterLibrary: debounce(searchKey => {
                        const allTracks = document.querySelectorAll("tbody tr");
                        allTracks.forEach(track => {
                            track.dataset.url.toLowerCase().includes(searchKey.toLowerCase())
                                ? track.style.display = "table-row"
                                : track.style.display = "none"
                        })
                    }, 350),
                    setNowPlaying: clickedRow => {
                        document.querySelector(".playing") 
                            ? document.querySelector(".playing").classList.remove("playing")
                            : null;
                        clickedRow.classList.add("playing");
                        const trackDetails = clickedRow.querySelectorAll("td"),
                            artist = trackDetails[0].innerHTML,
                            album = trackDetails[1].innerHTML,
                            track = trackDetails[2].innerHTML;
                        document.querySelector(".player__text").innerHTML = `${artist} / ${album} / ${track}`;
                        document.querySelector("title").innerHTML = `${artist} - ${track}`;
                        document.querySelector(".player__symbol").innerHTML = "pause";
                        window.audio.src = clickedRow.dataset.url;
                        window.audio.play();
                    },
                    togglePausePlay: () => {
                        const pauseOrPlay = document.querySelector(".player__symbol");
                        pauseOrPlay.innerHTML === "play_arrow" 
                            ? (pauseOrPlay.innerHTML = "pause",
                                window.audio.play())
                            : (pauseOrPlay.innerHTML = "play_arrow",
                                window.audio.pause())
                    },
                    get currentTimeDisplay() {
                        return formatSeconds(window.audio.currentTime)
                    },
                    get durationDisplay() {
                        return formatSeconds(window.audio.duration)
                    }
                }
            }
        }));
    });
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {  
    if (err) {
        return console.log('Error: ', err);
    }
    console.log(`Server is listening on ${port}`);
})
