module.exports = knex => (req, res, next) => {
    req.knex = knex
    next()
}