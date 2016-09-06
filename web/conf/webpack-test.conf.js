module.exports = {
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint'
            }
        ],

        loaders: [
            {
                test: /.json$/,
                loaders: [
                    'json'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [
                    'ng-annotate'
                ]
            },
            {
                test: /.html$/,
                loaders: [
                    'html'
                ]
            },
            {
                test: /\.(eot|woff|woff2|svg|ttf|png)([\?]?.*)$/,
                loader: "file-loader"
            }
            {
                test: /\.js$/,
                exclude: /(node_modules|.*\.spec\.js)/,
                loader: 'isparta'
            },
        ]
    },
    plugins: [],
    debug: true,
    devtool: 'cheap-module-eval-source-map'
};
