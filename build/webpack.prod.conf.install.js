process.env.NODE_ENV = 'production';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.conf.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin')



module.exports = merge(webpackBaseConfig, {
    entry: {
        main: './src/loading.js'
    },
    output: {
        path: path.resolve(__dirname, '../prod'),
        publicPath: '/prod/',
        filename: 'loading.js',
        library: 'loading',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },
    plugins: [
        // @todo
        new ExtractTextPlugin("style.css"),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
    ]
});
