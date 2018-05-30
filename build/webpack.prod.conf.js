process.env.NODE_ENV = 'production'
// process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js'这样的条件语句，在 webpack 配置文件中，无法按照预期运行
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackBaseConfig = require('./webpack.base.conf.js')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// var rimraf = require('rimraf')


console.log(process.env.NODE_ENV)

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  entry: {
    main: './src/main.js',
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendors',
        },
        'async-vendors': {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          chunks: 'async',
          name: 'async-vendors'
        }
      }
    },
    runtimeChunk: { name: 'runtime' }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: path.join(__dirname, '../prod/index.html'),
      template: path.join(__dirname, '../index.html')
    }),
    // http://vue-loader.vuejs.org/en/workflow/production.html
  ]
})
