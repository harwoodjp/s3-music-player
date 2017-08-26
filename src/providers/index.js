module.exports = async (req, res, next) => {
    const s = await req.knex.select('*').from('users').exec()
    console.log(s)
}