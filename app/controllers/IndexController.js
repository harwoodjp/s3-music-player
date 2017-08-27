const DataSource = require("../models/dataSource")

exports.home = (req, res) => {
	let exampleDataSource = new DataSource
	exampleDataSource.fetchById(process.env.DATA_SOURCE_ID).then(() => {
		res.render("index", { 
			bucket: exampleDataSource.config.bucket,
			prefix: exampleDataSource.config.prefix,
		})

	})

}
