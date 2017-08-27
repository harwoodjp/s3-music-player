const express = require("express")

const app = express(),
	settings = require("./settings")(app),
	router = require("./router")(app),
	db = require("../db")

app.listen(process.env.PORT, () => { 
	console.log(`Listening on port ${process.env.PORT}!`) 
})

