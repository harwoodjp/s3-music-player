const express = require("express")
const path = require ('path')

module.exports = app => {

	/* initialize dotenv */
	require('dotenv').config()

	/* set public/static path  */
	app.use(express.static(path.join(__dirname).replace("server", "public")))

	/* set view path and engine */
	app.set('views', `${path.join(__dirname).replace("server", "public")}/templates`)
	app.set('view engine', 'hbs')	


}
