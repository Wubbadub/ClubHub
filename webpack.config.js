'use strict'

var path = require('path')
var webpack = require('webpack')
var failPlugin = require('webpack-fail-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: [
    'whatwg-fetch',   // Used to support safari as fetch isn't provided in core-js polyfills (https://github.com/zloirock/core-js)
    'babel-polyfill',
    `${__dirname}/client/main.jsx`
  ],
  output: {
    path: `${__dirname}/dist`,
    filename: 'assets/bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new ExtractTextPlugin("assets/styles.css"),
    failPlugin,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
          'css?sourceMap!' +
          'less?sourceMap'
        )
      },
      {
        test: /font[\\|\/][^\.]+\.(eot|svg|ttf|woff|woff2)$/,
        loaders: ['file?name=assets/[name].[ext]']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?name=assets/[name].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  externals: {
    'Config': JSON.stringify(require('./config.dev.json'))
  },
  resolve: {
    modulesDirectories: [
      __dirname,
      'client',
      'node_modules',
      'client/components'
    ],
    extensions: ['', '.js', '.jsx']
  }
}
