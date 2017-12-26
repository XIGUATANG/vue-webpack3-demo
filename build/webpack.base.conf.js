const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const env = require('./env')
console.log(env.env)
const isProduction = env.env === 'production'

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                scss: process.env.NODE_ENV === 'production' ? ExtractTextPlugin.extract({
                  use: ['css-loader', 'sass-loader'],
                  fallback: 'vue-style-loader'
                }) : 'vue-style-loader!css-loader!',
                sass: process.env.NODE_ENV === 'production' ? ExtractTextPlugin.extract({
                  use: ['css-loader', 'sass-loader?indentedSyntax'],
                  fallback: 'vue-style-loader'
                }) : 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                css: process.env.NODE_ENV === 'production' ? ExtractTextPlugin.extract({
                  use: ['css-loader'],
                  fallback: 'vue-style-loader'
                }) : 'vue-style-loader!css-loader!sass-loader'
              }
            }
          }
        ],
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      }, {
        test: /\.(png|jpg|gif|woff|svg|eot|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]?[hash]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.less', '.vue'],
    // 使用了全局组件，主要在浏览器中编译，设置别名加载完整版vue，否则可不设置别名，仅加载run-time版vue
    alias: {
      // 'vue': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
}