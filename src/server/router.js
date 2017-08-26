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
		const dataSources = await req.knex.select(['provider_id', 'provider_config']).from('data_source').where({ user_id })
		// foreach data source
		//   build the provider obj from the appropriate SDK
		//   call the provider's getAll function
		// res.end(all the urls)
		res.end(JSON.stringify(dataSources))
	})

	app.post('/user/:id/data-source/s3', async (req, res, next) => {
		const { id: user_id } = req.params
		const [{ id: provider_id }] = await req.knex.select('id').from('provider').where({ name: 's3' })
		const r = await req.knex.insert({ provider_config: JSON.stringify(req.body), user_id, provider_id }).into('data_source')
		res.end(JSON.stringify(r))
	})

	app.get('/user/:id/data-source', async (req, res, next) => {
		const { id: user_id } = req.params
		const providerIds = await req.knex.select('provider_id').from('data_source').where({ user_id })
		const providers = await req.knex.select('*').from('data_source').whereIn('provider_id', providerIds.reduce((acc, curr) => [...acc, curr.provider_id], []))
		res.end(JSON.stringify(providers))
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