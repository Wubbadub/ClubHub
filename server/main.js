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

/*  #######################
*  #       WEBPACK       #
*  #######################
*/
const webpack = require('webpack')
const webpackConfig = require('../webpack.config.js')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const compiler = webpack(webpackConfig)
const webpackMiddleware = webpackDevMiddleware(compiler, {
  pnoInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
})

// Use webpack to build files in memory (to be served) ToDo: build to /dist for production
app.use(webpackMiddleware)
app.use(webpackHotMiddleware(compiler))

// #######################
// #       ROUTING       #
// #######################

// MIDDLEWARE FUNCTIONS -- app.use()
// provide resources in client path
app.use(express.static(path.join(path.join(__dirname, '/../client'))))

app.use(bodyParser.urlencoded({
  extended: true
}))

// Create form endpoint
// app.post('/newclub', function(req, res){
//   const data = {
//     'clubName': req.body.clubName,
//     'clubDescr': req.body.clubDescr
//   }

//   fs.readFile(path.join(__dirname + '/../client/template/hubsite/hubsite.html'), 'utf-8', function(err, source){
//     var template = handlebars.compile(source)
//     var html = template(data)
//     res.send(html)
//   })
// })

// Server listens to requests on PORT
app.listen(PORT, function reportRunning () {
  console.log(`Running on port ${PORT}`)
})
