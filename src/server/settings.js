const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

require('dotenv').config()

const { 
	MYSQL_HOST: host,
	MYSQL_USER: user,
	MYSQL_PASSWORD: password,
	MYSQL_DATABASE: database
} = process.env

const knex = require('knex')({
	client: 'mysql2',
	connection: { host, user, password, database }
})

module.exports = app => {

	/* set public/static path  */
	app.use(express.static(path.join(__dirname).replace("server", "public")))
	app.use(bodyParser.json())

	app.use(require('../handlers/knexShuttle')(knex))

	/* set view/template path */
	app.set('views', `${path.join(__dirname).replace("server", "public")}/templates`)

	/* set template engine */
	require('lodash-express')(app, 'html'); 
	app.set('view engine', 'html');

}
