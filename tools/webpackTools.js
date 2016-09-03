const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

exports.uglify = function() {
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                comments: false,
                compress: {
                    warnings: false,
                    drop_console: true
                }
            })
        ]
    }
}

exports.setFreeVariable = function(key, value) {
    const env = {};
    env[key] = JSON.stringify(value);

    return {
        plugins: [
            new webpack.DefinePlugin(env)
        ]
    }
}

exports.extractStyle = function(output) {
    return {
        module: {
            loaders: [
                {
                    test: /\.s?css$/,
                    loader: ExtractTextPlugin.extract('style', 'css!sass'),
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin(output)
        ]
    };
}

exports.literReact = function() {
    return {
        resolve: {
            alias: {
                'react': 'react-lite',
                'react-dom': 'react-lite'
            }
        }
    }
}

exports.setupJSX = function() {
    return {
        module: {
            loaders: [
                {
                    test: /\.js[x]?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'react']
                    }
                },
            ]
        }
    }
}

exports.setupStyle = function() {
    return {
        module: {
            loaders: [
                {
                    test: /\.s?css$/,
                    // the loaders are evaluated from right to left
                    loaders: ['style', 'css', 'sass'],
                }
            ]
        }
    };
}

exports.setupFonts = function() {
    return {
        module: {
            loaders: [
                {
                    test: /\.(otf|woff|woff2|eot|ttf)$/,
                    loader: 'url-loader?limit=100000&name=fonts/[name].[ext]'
                }
            ]
        }
    }
}

exports.setupImage = function() {
    return {
        module: {
            loaders: [
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    loader: 'url-loader?limit=8192&name=img/[name].[ext]'
                }
            ]
        }
    }
}

exports.setupJson = function() {
    return {
        module: {
            loaders: [
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                }
            ]
        }
    }
}