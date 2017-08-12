var path = require("path");
var ProvidePlugin = require("webpack").ProvidePlugin;
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractSass = new ExtractTextPlugin({ filename: "[name].[contenthash].css" })
var extractIndex = new ExtractTextPlugin({ filename: "index.html" })

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.sass|scss|css$/,
        use: extractSass.extract({
          use: ["css-loader", "sass-loader"]
        })
      }, {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|public\/)/,
        loader: "babel-loader"
      }, {
        test: /\.(jpg|png|svg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[sha256:hash:base62].[ext]",
            publicPath: "",
            outputPath: "assets/images/"
          }
        }
      }, {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader"
      }
    ]
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "src")
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({ inject: true, template: "src/index.html" }),
    new ProvidePlugin({ Promise: "promise-polyfill", fetch: "whatwg-fetch" }),
    extractSass, extractIndex
  ]
};
