/** Final config file that builds the output/bundled js file for use */

/** Library used to combine two or more webpack module  */
const {merge} = require('webpack-merge');
/** File that has webpacking rule for js and ts files */
const common = require('./webpack.common.js');
module.exports = merge(common, {
	mode: 'development',

	/** the name of the output file */
	output: {
		/** name of the file can be constant name
		 * Following the conventions followed in the other Esko cloud application.
		 */
		 filename: '[contenthash].js',
	},

	/** Setting up the files to consider when webpacking */
	module: {
		/** Declaring rules for the css file webpacking */
		rules: [{
				test: /\.css$/,

				/** The type of loader to be used when webpacking css files */
				use: [{
					loader: "style-loader",

				}, {
					loader: "css-loader"
				}, ]
			},
			{
				/** Rules for .less files (Leaner Style Sheets)*/
				test: /\.less$/,
				use: [{
					loader: "style-loader",

				}, {
					loader: "css-loader"
				}, {
					loader: "less-loader"
				}]
			}
		]
	},

	/** To build a single file. () */
	devtool: 'inline-source-map',

});