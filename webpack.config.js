const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'public/javascripts'),
        publicPath: '/javascripts',
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /.jsx?$/i,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.wasm', '.mjs', '.json', 'css'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new Dotenv({
            safe: true
        })
    ]
};
