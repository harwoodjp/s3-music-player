module.exports = {
	entry: "./public/ui/bundler.js",
	output: {
		filename: "./public/ui/bundle.js"
	},

	watch: true,

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/, 
				loader: "babel-loader",
				query: {
					presets: ["es2015", "react"]
				}
			},
		]
	}

};