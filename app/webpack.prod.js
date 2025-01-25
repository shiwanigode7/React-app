/** file that builds the webpack for production */

/** Library used to combine two or more webpack module  */
const {merge} = require('webpack-merge');
/** File that has webpacking rule for js and ts files */
const common = require('./webpack.common.js');
const webpack = require("webpack");
/** plugin to handle packing css files */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  	mode: 'production',
 	output: {
		filename: '[contenthash].js',
		sourceMapFilename: "../_sourcemaps/[file].map"
	},
	module: {
		rules: [
			{
				/** CSS and Less files are loaded a bit differently in production for performance */
				test: /\.css$/,
				use: [{
					loader: MiniCssExtractPlugin.loader,
					options: {
						publicPath: './'
					}
				}, {
					loader: "css-loader"
				}, ]
			},
			{
				test: /\.less$/,
				use: [{
					loader: MiniCssExtractPlugin.loader,
					options: {
						publicPath: './'
					}
				}, {
					loader: "css-loader"
				}, {
					loader: "less-loader"
				}]
			},
		]
	},
	plugins: [
		/** combine imported css into css files and use a <link> tag to import them*/
		new MiniCssExtractPlugin({ 
			filename: "[contenthash].css",
			chunkFilename: "[contenthash].css"
		}),
		new webpack.ids.HashedModuleIdsPlugin() // Use hash as names to cache bust

	],
	devtool: "hidden-source-map" // generate source maps but don't add them to the source

});

