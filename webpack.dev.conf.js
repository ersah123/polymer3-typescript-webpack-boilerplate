const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
	mode: "development",
	entry: {
		app: ["webpack-dev-server/client?http://localhost:8080", "./src/index"]
	},
	devtool: "inline-source-map",
	devServer: {
		contentBase: path.resolve(__dirname, "dist"),
		hot: true
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "..", "dist")
	},
	module: {
		rules: [
			{
				test: /\.(html)$/,
				use: {
					loader: "html-loader"
				}
			},
			{
				test: /\.ts?$/,
				use: "ts-loader",
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [".ts", ".js"]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/index.html"
		}),
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, "./manifest.json"),
				to: "./",
				ignore: [".*"]
			},
			{
				from: path.resolve(__dirname, "./images"),
				to: "images",
				ignore: [".*"]
			},
			{
				from: path.join(
					path.resolve(
						__dirname,
						"./node_modules/@webcomponents/webcomponentsjs/"
					),
					"*.js"
				),
				to: "./",
				ignore: ["./node_modules/@webcomponents/webcomponentsjs/gulpfile.js"]
			},
			{
				from: path.join(
					path.resolve(
						__dirname,
						"./node_modules/@webcomponents/webcomponentsjs/bundles/"
					),
					"*.js"
				),
				to: "./"
			}
		]),
		new webpack.IgnorePlugin(/vertx/),
		new webpack.HotModuleReplacementPlugin()
	]
};
