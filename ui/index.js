const _ = require('lodash')
const sass = require('node-sass')
const { promisify } = require('util')
const fs = require('fs')
const { resolve } = require('path')

const readFile = promisify(fs.readFile)
const render = promisify(sass.render)

const templateAsync = async path => _.template(await readFile(path))

const getStyle = async path =>
    _.template((await render({
        data: (await templateAsync(path))(),
        outputStyle: 'compressed'
    })).css.toString())

exports.loadLayout = async () => ({
    layout: await templateAsync(resolve(__dirname, 'layout.html')),
    player: await templateAsync(resolve(__dirname, 'player.html')),
    library: await templateAsync(resolve(__dirname, 'library.html')),
    style: await getStyle(resolve(__dirname, 'style.scss'))
})

exports.ClientLibrary = require('./ClientLibrary')
exports.EventLibrary = require('./EventLibrary')

// let layout, player, library, style;
// function loadLayout() {
//     layout = _.template(readFileSync("./ui/layout.html")),
//         player = _.template(readFileSync("./ui/player.html")),
//         library = _.template(readFileSync("./ui/library.html")),
//         style = _.template(sass.renderSync({
//             data: _.template(readFileSync("./ui/style.scss"))(), outputStyle: 'compressed'
//         }).css.toString());
// }
// loadLayout();