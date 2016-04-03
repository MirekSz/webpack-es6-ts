var webpack = require("webpack");
var path = require('path');

module.exports = function (config) {
    config.set({
        files: [
            // all files ending in "test"
            './node_modules/jquery/dist/jquery.min.js',
            'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js',
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            './node_modules/babel-polyfill/dist/polyfill.js',
            './tests/autoDiscoveryKarma.es6'
        ],

        frameworks: ['mocha', 'chai', 'sinon','sinon-chai'],

        preprocessors: {
            './tests/**/*.es6': ['webpack'],
            './app/**/*.es6': ['webpack']
        },

        reporters: ['spec', 'junit', 'coverage'],

        junitReporter: {
            outputFile: 'test-results.xml'
        },
        singleRun: true,
        restartOnFileChange: false,
        watch: false,
        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                {type: 'html', subdir: 'html'},
                {type: 'cobertura', subdir: ''}
            ]

        },
        webpack: {
            devtool: 'inline-module-source-map',
            module: {
                preLoaders: [
                    {
                        test: /\.es6?$/,
                        exclude: [
                            /node_modules/,
                            /tests/
                        ],
                        loader: 'isparta-instrumenter-loader'
                    }
                ],
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
                ]
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
            require("karma-sinon-chai"),
            require("karma-coverage"),
            require("karma-phantomjs-launcher"),
            require("karma-chrome-launcher"),
            require("karma-spec-reporter"),
            require("karma-junit-reporter")
        ],
        browsers: ['PhantomJS_custom'],

        // you can define custom flags
        customLaunchers: {
            'PhantomJS_custom': {
                base: 'PhantomJS',
                options: {
                    onCallback: function (data) {
                        if (data.type === "render") {
                            // this function will not have the scope of karma.conf.js so we must define any global variable inside it
                            if (window.renderId === undefined) {
                                window.renderId = 0;
                            }
                            page.render(data.fname || ("screenshots/screenshot_" + (window.renderId++) + ".png"));
                        }
                    }
                },
                flags: ['--load-images=true'],
                debug: true
            }
        }

    });
};
