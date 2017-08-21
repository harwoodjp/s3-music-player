const { provider } = require('../../util')

if (provider === 'local') {
    module.exports = require('./local')
} else {
    module.exports = (request, response) => undefined;
}