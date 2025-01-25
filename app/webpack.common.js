/**File defining the webpack rules for the js and ts files */

/**node js library to manage paths */
const path = require("path");

/** to handle copying the bundling files one src to destination */
const CopyWebpackPlugin = require("copy-webpack-plugin");

/**NPM definition - By default, this plugin will remove all files inside 
 * webpack's output.path directory, as well as all unused webpack 
 * assets after every successful rebuild. */
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

/**To generate an HTML file by supply our own template */
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ESLintPlugin = require('eslint-webpack-plugin');

/** the output directory */
const SRC_OUTPUT = "static";
/**  */
const SOURCEMAPS_OUTPUT = "_sourcemaps";
/** */
const WEBAPP = "webapp";
/** path for the js files */
const JS = "./scripts";
/** the of the webapp directory in the folder structure */
const outputRoot = path.resolve(__dirname, "..", "..", WEBAPP);

module.exports = {
  /** Entry point for the js file */
  entry: {
    /** Path of the top files that call all the other files in the application*/
    main: `${JS}/index.tsx`
  },

  /**Output path details
   * Note: the output file name will be given in webpack.config.js 
   */
  output: {
    path: path.resolve(outputRoot, SRC_OUTPUT),
    publicPath: "/"
  },


  resolve: {
    modules: ["../node_modules", path.resolve(JS), path.resolve(".")],
    alias: {},
    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx", '.tsx', '.ts']
  },

  /** this module is used to provide the loader that are to be used
 * when webpacking the js and jsx files.
 */
  module: {
    /** Rules for transpiling  */
    rules: [
      {
        /** for javascript with jsx syntax */
        test: /\.(js|jsx)$/,

        /** exclude node modules and esko modules for webpacking */
        exclude: {
          or: [/node_modules(\/|\\)(?!@esko)/]
        },
        /** loader to be used for transpiling/web packing */
        use: [{
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-proposal-class-properties",
            ],
            cacheDirectory: true,
            cacheCompression: false
          }
        }]
      },
      {
        /** for typescript files */
        test: /\.(ts|tsx)$/,
        exclude: {
          or: [/node_modules(\/|\\)(?!@esko)/]
        },
        /**loader for typescript, used in converting to js */
        use: [{
          loader: "ts-loader"
        }]
      },
      /**to get the html file */
      {
        test: /\.html$/,
        use: [
          {
            loader: "tpl-loader",
          }
        ]
      },

      {
        /**rules for images - images are emitted to the output folder */
        test: /\.(png|PNG|jpg|JPG|gif|GIF|svg|SVG|cur|ico)$/,
        use: [{
          loader: "file-loader",
          options: {
            publicPath:"/static",
            name:  "[hash].[ext]"
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)(\?cl=0)?$/,
        loader: "file-loader"
      }
    ]
  },


  plugins: [
    /**NPM definition - By default, this plugin will remove all files inside 
     * webpack's output.path directory, as well as all unused webpack 
     * assets after every successful rebuild. */
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.join(outputRoot, SRC_OUTPUT),
        path.join(outputRoot, SOURCEMAPS_OUTPUT)
      ],
      dangerouslyAllowCleanPatternsOutsideProject: true,
      dry: false
    }),


    new HtmlWebpackPlugin({
      chunks: ["main"],
      inject: false,
      template: "handlebars-loader!./html/indexTemp.jsp",
      filename: "../index.jsp"
    })
    
  ],

};
