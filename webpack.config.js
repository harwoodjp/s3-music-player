module.exports = {
	entry: "./app/client/bundler.js",
	output: {
		filename: "./app/client/bundle.js"
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