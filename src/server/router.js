const getDataFromDataSource = require("../logic/getDataFromDataSource")

module.exports = app => {

	app.post('/user', async (req, res, next) => {
		const { name } = req.body
		const r = await req.knex.insert({ name }).into('user')
		console.log(r)
		res.end('goood')
	})

	app.get('/user', async (req, res, next) => {
		const users = await req.knex.select('*').from('user')
		console.log(users)
		res.end(JSON.stringify(users, undefined, 4))
	})
	
	app.get('/user/:id/library', async (req, res, next) => {
		const { id: user_id } = req.params
		const dataSources = await req.knex.select('*').from('data_source').where({ user_id })
		res.end(JSON.stringify(dataSources))
	})

	app.post('/user/:id/providers', async (req, res, next) => {

	})

	app.post('/user')
	app.post('/user/:id/playlists')
	app.get('/user/:id/playlists')

	app.get('/', async (req, res, next) => {

	})

    // getDataFromDataSource().then(function() {

	// 	app.get('/', (req, res) => {

	//     	if (activeDataSource === undefined) {
	// 			res.render("index", { 
	// 				activeDataSource: "",
	// 				error: "Couldn't establish connection to data source."
	// 			})
	//     	} else {
	// 			res.render("index", {
	// 				activeDataSource
	// 			})
	//     	}

	// 	})


    // })


}