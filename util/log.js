const isDebug = require('./isDebug')

module.exports = message => isDebug ? console.log(message) : undefined
