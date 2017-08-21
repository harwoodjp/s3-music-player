const { provider } = require('../util')

module.exports = require(`./${provider.toLowerCase()}`)
