// ToDo: Get NodeJS running with es6 syntax (import)

// #######################
// #      CONSTANTS      #
// #######################

const PORT = require('./constants.js').PORT

// #######################
// #  SERVER INITIATION  #
// #######################

const express = require('express')
const app = express()
// const server = require('http').Server(app)
const bodyParser = require('body-parser')
const path = require('path')

// #######################
// #       WEBPACK       #
// #######################

let webpackValid = false

const webpack = require('webpack')
const webpackConfig = require('../webpack.config.js')
const compiler = webpack(webpackConfig)

compiler.run(function (err, stats) {
  if (err) { throw err }

  console.log(stats.toString({
    chunks: false, // Makes the build much quieter
    colors: true
  }))

  webpackValid = true
})

// #######################
// #       ROUTING       #
// #######################

// MIDDLEWARE FUNCTIONS -- app.use()

app.use(function (req, res, next) {
  console.log(`[app] ${req.method} ${req.url}`)
  next()
})

// provide resources in client path
app.use('/assets', express.static(path.join(__dirname, '/../dist/assets')))

app.get('/api/site/*', function (req, res) {
  res.json({
    'title': 'Sample Club',
    'sections': [
      {
        'type': 'hero',
        'title': 'Sample Club',
        'button-a': {
          'type': 'email',
          'content': 'sample@uvic.ca'
        }
      }
    ]
  })
})

app.get('/api/*', function (req, res) {
  res.status(404).json({'error': 'PC Load Letter'})
})

app.get('/*', function (req, res) {
  if (webpackValid) res.sendFile(path.join(__dirname, '/../dist/index.html'))
  else console.log('[app] waiting for valid webpack')
})

app.use(bodyParser.urlencoded({
  extended: true
}))

app.listen(PORT, function reportRunning () {
  console.log(`[app] running on port ${PORT}`)
})
