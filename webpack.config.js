const path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var validate = require('webpack-validator');

const tools = require('./tools/webpackTools');

const PATHS = {
    app: path.resolve(__dirname, 'app', 'client.js'),
    build: path.resolve(__dirname, 'app', 'public')
}

const common = {
    entry: {
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        filename: 'js/[name].js'
    }
};

var config;

switch (process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(common,
            {devtool: 'source-map'},
            tools.setFreeVariable('process.env.NODE_ENV', 'production'),
            tools.literReact(),
            tools.setupJSX(),
            tools.setupFonts(),
            tools.setupImage(),
            tools.setupJson(),
            tools.extractStyle('css/style.css'),
            tools.uglify()
        )
        break;
    default:
        config = merge(common,
            {devtool: 'eval-source-map'},
            tools.setupJSX(),
            tools.setupStyle(),
            tools.setupFonts(),
            tools.setupImage(),
            tools.setupJson()
        );
}

module.exports = validate(config, {
    quiet: true
});