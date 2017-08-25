const getDataFromDataSource = require("../logic/getDataFromDataSource")

module.exports = app => {

    getDataFromDataSource().then(function() {

		app.get('/', (req, res) => {

	    	if (activeDataSource === undefined) {
				res.render("index", { 
					activeDataSource: "",
					error: "Couldn't establish connection to data source."
				})
	    	} else {
				res.render("index", {
					activeDataSource
				})
	    	}

		})


    })


}