const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    include: paths,
                    use: ExtractTextPlugin.extract({
                        publicPath: '../',
                        fallback: 'style-loader',
                        use: ['css-loader', 'autoprefixer-loader', 'sass-loader'],
                    }),
                },
                {
                    test: /\.css$/,
                    include: paths,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader'
                    }),
                },
            ],
        },
        plugins: [
            new ExtractTextPlugin('./css/[name].css'),
        ],
    };
};


// module.exports = {
//     module: {
//         rules: [
//             {
//                 test: /\.scss$/,
//                 use: ExtractTextPlugin.extract({
//                     publicPath: '../',
//                     fallback: 'style-loader',
//                     use: ['css-loader', 'autoprefixer-loader', 'sass-loader'],
//                 }),
//             },
//             {
//                 test: /\.css$/,
//                 use: ExtractTextPlugin.extract({
//                     fallback: 'style-loader',
//                     use: 'css-loader'
//                 }),
//             },
//         ],
//     },
//     plugins: [
//         new ExtractTextPlugin('./css/[name].css'),
//     ]
// };