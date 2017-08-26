const express = require("express")

const app = express(),
	settings = require("./settings")(app),
	router = require("./router")(app)

app.listen(process.env.PORT, () => { 
	console.log(`Listening on port ${process.env.PORT}!`) 
})

