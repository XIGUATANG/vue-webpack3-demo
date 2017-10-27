var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpackBaseConfig = require('./webpack.base.conf.js')
// var rimraf = require('rimraf')

process.env.NODE_ENV = 'production'

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
    chunkFilename:'[name].chunk.js'
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
