const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
    source: path.join(__dirname, 'source'),
    build: path.join(__dirname, 'build')
};

module.exports = {
    entry: {
        'index': PATHS.source + '/pages/index/index.js',
        'blog': PATHS.source + '/pages/blog/js/blog.js'
    },
    output: {
        path: PATHS.build,
        filename: 'js/[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['index','common'],
            template: PATHS.source + '/pages/index/index.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'blog.html',
            chunks: ['blog','common'],
            template: PATHS.source + '/pages/blog/blog.pug'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
        }),
        new ExtractTextPlugin('./css/[name].css')
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    publicPath: '../',
                    fallback: 'style-loader',
                    use: ['css-loader', 'autoprefixer-loader', 'sass-loader'],
                }),
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                }),
            },
            {
              test: /\.(jpg|png|svg)$/,
              loader: 'file-loader',
              options: {
                  name: 'images/[name].[ext]'
               },
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.json$/,
                loader: 'file-loader',
                options: {
                  name: 'images/[name].[ext]'
               }
            },
            {
                test: /\.wav$/,
                loader: 'file-loader',
                options: {
                  name: 'sounds/[name].[ext]'
               }
            }
        ],  
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]        
    },
    devServer: {
        stats: 'errors-only',
        port: 9000
    }
};