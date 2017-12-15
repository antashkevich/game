const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const merge = require('webpack-merge');
//const pug = require('./webpack/pug');
//const devserver = require('./webpack/devserver');
//const sass = require('./webpack/sass');
//const css = require('./webpack/css');
//const extractCSS = require('./webpack/css.extract');
//const images = require('./webpack/images');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const json = require('./source/pages/blog/images/dude_sprite.json');

const PATHS = {
    source: path.join(__dirname, 'source'),
    build: path.join(__dirname, 'build')
};

/*var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js'),
    pixi = path.join(phaserModule, 'build/custom/pixi.js'),
    p2 = path.join(phaserModule, 'build/custom/p2.js');*/

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
            }/*,
            {
                test: /\.wav$/,
                loader: 'file-loader',
                options: {
                  name: 'sounds/[name].[ext]'
               }
            }*/
        ],  
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
            //{ test: /pixi.js/, loader: "script" },
        ]        
    },/*
    resolve: {
        alias: {
            'phaser': phaser,
            'pixi.js': pixi,
            'p2': p2,
        }
    },*/
    devServer: {
        stats: 'errors-only',
        port: 9000
    }
};



/*const common = merge([
    {
        entry: {
            'index': PATHS.source + '/pages/index/index.js',
            'blog': PATHS.source + '/pages/blog/blog.js'
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
            })
        ],
        module: {
            loaders: [
                { test: /pixi\.js/, loader: 'expose?PIXI' },
                { test: /phaser-split\.js$/, loader: 'expose?Phaser' },
                { test: /p2\.js/, loader: 'expose?p2' },
            ]
        },
        resolve: {
            alias: {
                'phaser': phaser,
                'pixi.js': pixi,
                'p2': p2
            }
        }
    },    
    pug(),
    images(),
]);*/

/*module.exports = function(env) {
    if (env === 'production') {
        return merge([
            common,
            extractCSS()
        ]);
    }
    if (env === 'development') {
        return merge([
            {},
            common,
            devserver(),
            sass(),            
            css()
        ]);
    }
};*/