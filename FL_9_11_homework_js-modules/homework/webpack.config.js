const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const entryPoint = './src/js/output-module.js';
const outputJsName = 'bundle.js';

module.exports = {
  entry: entryPoint,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: outputJsName
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        }
    ]
  },
  plugins: [
    new UglifyJSPlugin(),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
        template: './src/index.html'
    })
  ]
}