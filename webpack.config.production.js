'use strict'

var path = require('path')
var webpack = require('webpack')
var failPlugin = require('webpack-fail-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-source-map',
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
    new ExtractTextPlugin("assets/styles.css"),
    failPlugin,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.optimize.AggressiveMergingPlugin(),
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
          'css?!less?compress'
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
    'Config': JSON.stringify(require('./config.prod.json'))
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
