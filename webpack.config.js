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
        'index': PATHS.source + '/pages/landing/index.js',
        'game': PATHS.source + '/pages/game/js/game.js'
    },
    output: {
        path: PATHS.build,
        filename: 'js/[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['index','common'],
            template: PATHS.source + '/pages/landing/index.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'game.html',
            chunks: ['game','common'],
            template: PATHS.source + '/pages/game/game.pug'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
        }),
        new ExtractTextPlugin('./css/[name].css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": 'jquery',
            "windows.jQuery": 'jquery',
        })
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
            }/*,
            {
                test: /\.(jpe?g|png|gif)$/,
                exclude: /(node_modules)/,
                loader: 'url-loader?limit=10000'
            }, 
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            }, 
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }*/
        ]        
    },
    devServer: {
        stats: 'errors-only',
        port: 9000
    }
};