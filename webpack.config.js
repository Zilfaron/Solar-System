let path = require("path");

let miniCSSExtractPlugin = require("mini-css-extract-plugin"),
		htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	entry: "./src/js/main.js",
	output: {
		path: path.resolve(__dirname, "./build/"),
		filename: "scripts.min.js"
	},
	devServer: {
		overlay: true
	},
	plugins: [
		new miniCSSExtractPlugin({
			filename: "styles.min.css"
		}),
		new htmlWebpackPlugin({
			template: "./src/index.pug"
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ["babel-loader"]
			},
			{
				test: /\.scss$/,
				use: ["style-loader",
							miniCSSExtractPlugin.loader, 
							"css-loader",
							"postcss-loader",
							"sass-loader"]
			},
			{
				test: /\.css$/,
				use: ["style-loader", 
							"css-loader"]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [
					{
						loader: "file-loader?name=./img/[name].[ext]"
					}
				]
			},
			{
				test: /\.(ttf|woff|woff2|otf)$/,
				use: [
					{
						loader: "file-loader?name=./fonts/[name].[ext]"
					}
				]
			},
			{
				test: /\.pug$/,
				use: [
					{
						loader: "pug-loader"
					}
				]
			}
		],
	}
}