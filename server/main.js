// ToDo: Get NodeJS running with es6 syntax (import)

// #######################
// #      CONSTANTS      #
// #######################

const PORT = require('./constants.js').PORT
const GOOGLE_CLIENT_ID = require('./constants.js').GOOGLE_CLIENT_ID

"use strict"
// #######################
// #  SERVER INITIATION  #
// #######################

const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const db = require('./api/db.js')
const crypto = require('crypto')

const oauth2 = require('google-auth-library/lib/auth/oauth2client')
const jwt = new oauth2(GOOGLE_CLIENT_ID)

const production = (process.env.NODE_ENV === 'production')

// #######################
// #       WEBPACK       #
// #######################

if (production) {
  console.log('[app] running in PRODUCTION mode')
} else {
  console.log('[app] running in DEVELOPMENT mode')
  const webpack = require('webpack')
  const webpackConfig = require('../webpack.config.js')
  const compiler = webpack(webpackConfig)

  compiler.watch({}, function (err, stats) {
    if (err) { throw err }

    console.log(stats.toString({
      chunks: false, // Makes the build much quieter
      colors: true
    }))
  })
}

// #######################
// #       ROUTING       #
// #######################

// MIDDLEWARE FUNCTIONS -- app.use()

// Server console log
app.use(function (req, res, next) {
  let timestamp = new Date().toISOString()
  console.log(`[app ${timestamp}] [${req.ip}] ${req.method} ${req.url}`)
  next()
})

// provide resources in client path
app.use('/assets', express.static(path.join(__dirname, '/../dist/assets')))

app.use(bodyParser.json({type: 'application/json'}))

app.use(bodyParser.urlencoded({
  extended: true
}))

// Add the "Access-Control-Allow-Origin:*" header to everything
app.use(cors())

// Extract and validate user authentication, if it was included
app.use((req, res, next) => {
  let auth = req.get("authorization")
  if(!auth)
  {
    next()
  } else {
    try {
      // Validate using google's library
      jwt.verifyIdToken(auth, null, function (err, login){
        if (err)
        {
          req.auth_error = err
        }
        if (login)
        {
          req.payload = login.getPayload()
        }
        next()
      })
    } catch (err) {
      next()
    }
  }
})

// #######################
// #        API          #
// #######################

// TODO: User authentication (via user or temp_token)
app.get('/api/site/*', function (req, res) {
  let url = req.path.substring(req.path.lastIndexOf('/') + 1)
  db.getSiteData(url, function (json) {
    if (json === null) res.status(404).json({'error': 'site not found'})
    else res.json(json)
  })
})

// Check if a given site exists without transmitting the entire site data
// Use to verify a url is available as the user types it
app.get('/api/site_exists/*', function (req, res) {
  let url = req.path.substring(req.path.lastIndexOf('/') + 1)
  db.checkSiteExists(url, function (exists) {
    res.send(exists)
  })
})

app.get('/api/*', function (req, res) {
  res.status(404).json({'error': 'PC Load Letter'})
})

// Update a site
// TODO: User authentication
app.post('/api/site/*', function (req, res) {
  let url = req.path.substring(req.path.lastIndexOf('/') + 1)

  db.updateSite(url, 1, req.body, function (success) {
    res.send(success) // Just return success for now, later add error codes possibly
  })
})

// Create a new site with the url indicated by the post address
// and sitename sent in the json object { "siteName" : "Example Club" }
// Returns the json object of the new site upon success; false otherwise
// TODO: Random token
app.post('/api/newsite/*', function (req, res) {
  let url = req.path.substring(req.path.lastIndexOf('/') + 1)
  let siteName = req.body.siteName

  // If there's already a user logged in
  if (req.payload)
  {
    // Get user db id
    db.getUserID(0, req.payload.sub, function (id) {
      if (!id) {
        // User doesn't exist despite sending this token --> This should never happen here
        res.send("Error User Not Found")
      } else {
        db.createNewSite(url, siteName, null, function (json) {
          if (!json) {
            res.send("Error creating site")
          } else {
            db.addUserPermission(0, id, url, 1, function (result) {
              if (!result)
              {
                // This should also never happen
                res.send("Error assigning ownership to site " + url)
              } else {
                res.send(json) // Success
              }
            })
          }
        })
      }
    })
  } else if (!req.get("authorization")){
    let temporary_key = crypto.randomBytes(32).toString('base64').replace(/\//g,'_').replace(/\+/g,'-')
    db.createNewSite(url, siteName, temporary_key, function (json) {
      if (!json) {
        res.send("Error creating site")
      } else {
        res.append('Temporary-Key', temporary_key)
      }
    })
  } else {
    res.send("Invalid Token")
  }
})

// #######################
// #        App          #
// #######################

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/../dist/index.html'))
})

app.listen(PORT, function reportRunning () {
  console.log(`[app] running on port ${PORT}`)
})
