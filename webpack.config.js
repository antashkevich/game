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
        'game': PATHS.source + '/pages/game/js/index.js'
    },
    output: {
        path: PATHS.build,
        filename: 'js/[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['index'],
            template: PATHS.source + '/pages/landing/index.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'game.html',
            chunks: ['game'],
            template: PATHS.source + '/pages/game/game.pug'
        }),
        new ExtractTextPlugin('./css/[name].css'),
        new webpack.ProvidePlugin({            
            $: 'jquery',
              jQuery: 'jquery',
              'window.jQuery': 'jquery',
              Popper: ['popper.js', 'default'],
              Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
              Button: 'exports-loader?Button!bootstrap/js/dist/button',
              Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
              Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
              Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
              Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
              Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
              Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
              Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
              Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
              Util: 'exports-loader?Util!bootstrap/js/dist/util'
        }),
        new webpack.HotModuleReplacementPlugin()
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
            },
            {
                test: /\.(TTF|ttf|eot|woff|woff2)$/,
                loader: "file-loader",
                options: {
                    name: "fonts/[name].[ext]",
                }
            },
              // Bootstrap 4
             {
                test: /bootstrap\/dist\/js\/umd\//, use: 'imports-loader?jQuery=jquery'
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