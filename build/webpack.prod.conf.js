 process.env.NODE_ENV = 'production'
// process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js'这样的条件语句，在 webpack 配置文件中，无法按照预期运行
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackBaseConfig = require('./webpack.base.conf.js')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
// var rimraf = require('rimraf')


console.log(process.env.NODE_ENV)

module.exports = merge(webpackBaseConfig, {
  entry: {
    main: './src/main.js',
    vendor: [
      'vue',
      'vue-router'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../prod'),
    publicPath: './',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].chunk.js'
  },
  module: {
    rules: [{
      test: /\.html$/,
      loader: 'html-loader',
      options: {
        minimize: true
      }
    }]
  },
  plugins: [
    new ExtractTextPlugin("style.[contenthash].css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      //filename: 'vendor.js'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: path.join(__dirname, '../prod/index.html'),
      template: path.join(__dirname, '../index.html')
    }),
    // http://vue-loader.vuejs.org/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  ]
})
