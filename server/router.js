module.exports = app => {

	app.get('/', (req, res) => {
		res.render("index", {
			foo: "bar",
			bar: () => { return "foo" }
		})
	})

}