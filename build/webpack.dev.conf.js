/**
 * 本地预览
 */

var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var merge = require('webpack-merge')
var webpackBaseConfig = require('./webpack.base.conf.js')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var ip = require("ip")

module.exports = merge(webpackBaseConfig, {
    mode: 'development',
    // 入口
    entry: {
        main: './src/main.js',
        vendor: [
            'vue',
            'vue-router'
        ]
    },
    output: {
        path: path.join(__dirname, '../prod'),
        publicPath: '',
        filename: '[name].[hash].js',
        chunkFilename:'[name].chunk.js'
    },
    module: {
        rules: [{
            test: /\.html$/,
            loader: 'html-loader',
            options: {
                minimize: false
            }
        }]
    },
    devServer: {
        host: '0.0.0.0',
        public: ip.address() + ':8008',
        port: '8008',
        stats: {
            colors: true
        }
    },
    devtool: '#source-map',
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            filename: path.join(__dirname, '../prod/index.html'),
            template: path.join(__dirname, '../index.html')
        }),
        new FriendlyErrorsPlugin(),
    ]
});
