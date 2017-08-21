const { provider } = require('../util')

module.exports = {
    getUrlArray: require(`./${provider.toLowerCase()}`)
}
