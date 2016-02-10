var webpack = require("webpack");
module.exports = function (config) {
    config.set({
        files: [
            // all files ending in "test"
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            './node_modules/babel-polyfill/dist/polyfill.js',
            './tests/TestExecutor.es6'
        ],

        frameworks: ['mocha', 'chai', 'sinon'],

        preprocessors: {
            './tests/**/*.es6': ['webpack', 'sourcemap'],
            './app/**/*.es6': ['webpack', 'sourcemap']
        },

        reporters: ['spec', 'junit', 'coverage'],

        junitReporter: {
            outputFile: 'test-results.xml'
        },
        singleRun: true,
        restartOnFileChange: false,
        watch: false,
        coverageReporter: {
            type: 'cobertura',
            dir: 'coverage/'
        },
        webpack: {
            devtool: 'inline-module-source-map',
            module: {
                loaders: [
                    {test: /\.css$/, loader: "style!css"},
                    {
                        test: /\.es6$/, loader: "babel", query: {
                        presets: ['es2015']
                    },
                        exclude: /node_modules/
                    },
                    {
                        test: /\.js$/, loader: "babel", query: {
                        presets: ['es2015']
                    },
                        exclude: /node_modules/
                    },
                    {test: /\.less$/, loader: "style!css!less"},
                    {
                        test: /\.hbs/,
                        loader: "handlebars-loader"
                    }
                ],
                postLoaders: [{
                    test: /\.es6/,
                    exclude: /(app\/src\/tests|node_modules|bower_components)/,
                    loader: 'istanbul-instrumenter'
                }]
            },
            resolve: {
                extensions: ['', '.js', '.es6'],
                modulesDirectories: [
                    "",
                    "app",
                    "node_modules"
                ]
            }
        },

        webpackMiddleware: {
            noInfo: true
        },

        plugins: [
            require("karma-webpack"),
            require("karma-sourcemap-loader"),
            require("istanbul-instrumenter-loader"),
            require("karma-mocha"),
            require("karma-chai"),
            require("karma-sinon"),
            require("karma-coverage"),
            require("karma-phantomjs-launcher"),
            require("karma-chrome-launcher"),
            require("karma-spec-reporter"),
            require("karma-junit-reporter")
        ],
        browsers: ['PhantomJS']
    });
};
