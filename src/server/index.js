const express = require("express")
const log = require('../lib/log')

const app = express(),
	settings = require("./settings")(app),
	router = require("./router")(app)

app.listen(process.env.PORT || 3000, () => { 
	log(`Listening on port ${process.env.PORT}!`) 
})
