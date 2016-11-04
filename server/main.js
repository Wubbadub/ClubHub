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
const db = require('./api/db.js')

// #######################
// #       WEBPACK       #
// #######################

let webpackValid = false

const webpack = require('webpack')
const webpackConfig = require('../webpack.config.js')
const compiler = webpack(webpackConfig)

compiler.watch({}, function (err, stats) {
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

app.use(bodyParser.json({type: 'application/json'}))

app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/api/site/*', function (req, res) {
  let url = req.path.substring(req.path.lastIndexOf('/') + 1)
  db.getSiteData(url, function (json) {
    if (json === null)
      res.status(404).json({'error': 'site not found'})
    else
      res.json(json)
  })
})

// Check if a given site exists without transmitting the entire site data
// Use in the create
app.get('/api/site_exists/*', function (req, res) {
  let url = req.path.substring(req.path.lastIndexOf('/') + 1)
  db.checkSiteExists(url, function (exists) {
    res.send(exists)
  })
})

app.get('/api/*', function (req, res) {
  res.status(404).json({'error': 'PC Load Letter'})
})

app.get('/*', function (req, res) {
  if (webpackValid) res.sendFile(path.join(__dirname, '/../dist/index.html'))
  else console.log('[app] waiting for valid webpack')
})

// Update a site
app.post('/api/site/*', function(req, res){
  let url = req.path.substring(req.path.lastIndexOf('/') + 1)
  // TODO: User authentication
  db.updateSite(url, 1, req.body, function (success) {
    res.send(success) // Just return success for now, later add error codes possibly
  })
})

// Create a new site with the url indicated by the post address
// and sitename sent in the json object { "siteName" : "Example Club" }
// Returns the json object of the new site upon success; false otherwise
app.post('/api/newsite/*', function(req, res){
  let url = req.path.substring(req.path.lastIndexOf('/') + 1)
  let siteName = req.body.siteName
  if (siteName)
    db.createNewSite(url, siteName, function (json) {
      res.json(json)
    })
  else
    res.send(false)
})

// Create new site

app.listen(PORT, function reportRunning () {
  console.log(`[app] running on port ${PORT}`)
})
