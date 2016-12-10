const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const FailPlugin = require('webpack-fail-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    module: {
        loaders: [
            {
                test: /.json$/,
                loaders: [
                    'json-loader'
                ]
            },
            {
                test: /.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                enforce: 'pre'
            },
            {
                test: /\.(css|scss)$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [
                    'ng-annotate-loader',
                    'babel-loader'
                ]
            },
            {
                test: /.html$/,
                loaders: [
                    'html-loader'
                ]
            },
            {
                test: /\.(eot|woff|woff2|svg|ttf|png)([\?]?.*)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        FailPlugin,
        new webpack.DefinePlugin({
            ENVIRONMENT: JSON.stringify('dev')
        }),
        new webpack.ProvidePlugin({
            _: 'lodash',
            moment: 'moment'
        }),
        new HtmlWebpackPlugin({
            template: conf.path.src('index.html')
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: () => [autoprefixer]
            },
            debug: true
        })
    ],
    devtool: 'cheap-source-map',
    output: {
        path: path.join(process.cwd(), conf.paths.tmp),
        filename: 'index.js'
    },
    entry: `./${conf.path.src('index')}`
};
