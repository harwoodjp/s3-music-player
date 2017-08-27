const index_controller = require("../../app/controllers/indexController")

module.exports = app => {
	app.get('/', index_controller.home)
}