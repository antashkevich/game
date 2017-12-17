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
       /* new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
        }),*/
        new ExtractTextPlugin('./css/[name].css'),

        /*new TransferWebpackPlugin([
          { from: './css' },
        ]),*/
        new webpack.ProvidePlugin({
            /*$: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": 'jquery',
            "windows.jQuery": 'jquery',
            Popper: ['popper.js', 'default'],
            Util: "exports-loader?Util!bootstrap/js/dist/util",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown"*/

            $: 'jquery',
              jQuery: 'jquery',
              'window.jQuery': 'jquery',
              tether: 'tether',
              Tether: 'tether',
              'window.Tether': 'tether',
              Popper: ['popper.js', 'default'],
              'window.Tether': 'tether',
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
        new webpack.HotModuleReplacementPlugin(),
       /* new TransferWebpackPlugin([
            { from: './css' },
        ])*/
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


            /*{
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000',
              },
              {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader',
              },
              {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                  'file-loader?name=images/[name].[ext]',
                  'image-webpack-loader?bypassOnDebug'
                ]
              },
              // font-awesome
              {
                test: /font-awesome\.config\.js/,
                use: [
                  { loader: 'style-loader' },
                  { loader: 'font-awesome-loader' }
                ]
              },*/

              // Bootstrap 4
              {
                test: /bootstrap\/dist\/js\/umd\//, use: 'imports-loader?jQuery=jquery'
              }


        ],  
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            /*{
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