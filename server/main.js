// ToDo: Get NodeJS running with es6 syntax (import)

// #######################
// #      CONSTANTS      #
// #######################

const PORT = require('./constants.js').PORT
const GOOGLE_CLIENT_ID = require('./constants.js').GOOGLE_CLIENT_ID
const GOOGLE_SERVICE_ENUM = require('./constants.js').GOOGLE_SERVICE_ENUM

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

// A function to check site activity
app.get('/api/active/*', function(req, res){
  let url = req.path.substring(req.path.lastIndexOf('/') + 1)
  db.checkSiteActive(url,function(result){
    res.send(result)
  })
})

// function to set site active flag
app.post('/api/active/*', function(req, res){
  let url = req.path.substring(req.path.lastIndexOf('/') + 1)
  if(req.payload){
    db.getUserID(GOOGLE_SERVICE_ENUM, res.payload.sub, function (id){
      db.updateSiteActive(req.body, url, id, function (result){
        res.send(result)
      })
    })
  } else {
    res.status(403).json({'error': 'Access Denied'})
  }
})

// A function that returns a users payload
app.get('/api/permissions', function(req, res){
  if(req.payload){
    db.getUserID(GOOGLE_SERVICE_ENUM, res.payload.sub, function (id){
      if(id){
        db.getUserSitePermissions(id,function(permissions){
          res.json(permissions)
        })
      } else {
        res.status(403).json({'error': 'User Not Found'})
      }
    })
    } else {
    res.status(403).json({'error': 'Access Denied'})
  }
})

// Returns site data if user has access
app.get('/api/site/*', function (req, res) {
  let url = req.path.substring(req.path.lastIndexOf('/') + 1)
  let site_temp_key = res.get('Temporary-Key')
  db.checkSiteExists(url, function (exists) {
    if (exists)
    {
      db.checkSiteActive(url, function (active){
        if (active) {
          db.getSiteData(url, function (json) {
            if (json === null) res.status(404).json({'error': 'site not found'})
            else res.json(json)
          })
        } else {
          if (res.payload) {
            db.getUserID(GOOGLE_SERVICE_ENUM, res.payload.sub, function (id){
              db.getUserPermission(id, url, function(permission) {
                if(permission){
                  db.getSiteData(url, function (json) {
                    if (json === null) res.status(404).json({'error': 'site not found'})
                    else res.json(json)
                  })
                } else {
                  res.status(403).json({'error': 'Access Denied'})
                }
              })
            })
          } else if (site_temp_key){
            db.getSiteAgeAndTemporaryKey(url, function (temporary_key) {
              if (site_temp_key === temporary_key)
              {
                db.getSiteData(url, function (json) {
                  if (json === null) res.status(404).json({'error': 'site not found'})
                  else res.json(json)
                })
              }
            })
          } else { // The site is not active, user is not logged in, and didn't send a temp_key
            res.status(403).json({'error': 'Access Denied'})
          }
        }
      })
    } else {
      res.status(404).json({'error': 'site not found'})
    }
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
app.post('/api/site/*', function (req, res) {
  if (res.payload) {
    let url = req.path.substring(req.path.lastIndexOf('/') + 1)
    db.getUserID(GOOGLE_SERVICE_ENUM, res.payload.sub, function (id) {
      db.updateSite(url, id, req.body, function (success) {
        res.send(success) // Just return success for now, later add error codes possibly
      })
    })
  } else {
    res.send("Access Denied")
  }
})

// Create a new site with the url indicated by the post address
// and sitename sent in the json object { "siteName" : "Example Club" }
// Returns the json object of the new site upon success; false otherwise
app.post('/api/newsite/*', function (req, res) {
  let url = req.path.substring(req.path.lastIndexOf('/') + 1)
  let siteName = req.body.siteName

  // If there's already a user logged in
  if (req.payload)
  {
    // Get user db id
    db.getUserID(GOOGLE_SERVICE_ENUM, req.payload.sub, function (id) {
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
                res.send("Error assigning ownership to site '" + url + "'")
              } else {
                res.send(json) // Success
              }
            })
          }
        })
      }
    })
  } else if (req.auth_error){
    res.send("Invalid Token")
  } else {
    let temporary_key = crypto.randomBytes(16).toString('hex')
    db.createNewSite(url, siteName, temporary_key, function (json) {
      if (!json) {
        res.send("Error Creating Site")
      } else {
        res.append('Temporary-Key', temporary_key)
        res.send(json)
      }
    })
  }
})

// Add a user to the database
// Responds with true if they were added, false otherwise
app.post('/api/newuser', function(req, res) {
  if (req.payload){
    db.createUser(req.payload.name, GOOGLE_SERVICE_ENUM, req.payload.sub, req.payload.email, function (result) {
      if (err){
        res.send(false)
      } else{
        res.send(result)
      }
    })
  } else {
    res.status(400).send("Unable to create new user without valid token")
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
