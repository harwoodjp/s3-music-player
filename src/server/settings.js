const express = require("express")
const path = require ('path')

module.exports = app => {

	/* initialize dotenv */
	require('dotenv').config()

	/* set public/static path  */
	app.use(express.static(path.join(__dirname).replace("server", "public")))

	/* set view/template path */
	app.set('views', `${path.join(__dirname).replace("server", "public")}/templates`)

	/* set template engine */
	require('lodash-express')(app, 'html'); 
	app.set('view engine', 'html');

}
