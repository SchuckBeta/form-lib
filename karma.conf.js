var webpack = require('webpack');

module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        singleRun: true,
        color: true,
        frameworks: ['mocha'],
        files: [
            'tests.webpack.js'
        ],
        preprocessors: {
            'tests.webpack.js': ['webpack', 'sourcemap']
        },
        reporters: ['mocha'],
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                {
                    exclude: /node_modules/,
                    test: /\.jsx?$/,
                    loader: 'babel',
                    query: {
                        presets: ['es2015', 'stage-0', 'react']
                    }
                }
                ]
            }
        },
        webpackServer: {
            noInfo: true
        }
    });
};
