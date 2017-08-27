const express = require("express")
const path = require ('path')

module.exports = app => {

	/* initialize dotenv */
	require('dotenv').config()

	/* set public/static path  */
	let clientFolder = path.join(__dirname).replace("config/server", "app/client");
	app.use(express.static(clientFolder))

	/* set view/template path */
	let viewsFolder = path.join(__dirname).replace("config/server", "app/views");
	app.set('views', viewsFolder)

	/* set template engine */
	require('lodash-express')(app, 'html'); 
	app.set('view engine', 'html');

}
