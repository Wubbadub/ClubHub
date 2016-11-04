'use strict'

var path = require('path')
var webpack = require('webpack')
var failPlugin = require('webpack-fail-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
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
        loaders: ['style', 'css', 'less']
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
