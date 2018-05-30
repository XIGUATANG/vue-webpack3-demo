const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const env = require('./env')
console.log(env.env)
const isProduction = env.env === 'production'

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const cssLoaders = [
  process.env.NODE_ENV !== 'production'
    ? 'vue-style-loader'
    : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      sourceMap: true
    }
  }, {
    loader: 'postcss-loader',
    options: {
      sourceMap: true
    }
  }
]

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: cssLoaders.concat(['sassloader']),
            sass: [...cssLoaders, 'sass-loader?indentedSyntax'],
            css: cssLoaders
          }
        }
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
        use: cssLoaders
      }, {
        test: /\.scss$/,
        use: [...cssLoaders, 'sass-loader']
      }, {
        test: /\.(png|jpg|gif|woff|svg|eot|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[name].[ext]?[hash]'
            }
          }
        ]
      }
    ]
  },
  plugins: [

    new VueLoaderPlugin()
  ],
  resolve: {
    extensions: ['.js', '.less', '.vue'],
    // 使用了全局组件，主要在浏览器中编译，设置别名加载完整版vue，否则可不设置别名，仅加载run-time版vue
    alias: {
      // 'vue': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
}