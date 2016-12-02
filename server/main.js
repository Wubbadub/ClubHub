// ToDo: Get NodeJS running with es6 syntax (import)

// #######################
// #      CONSTANTS      #
// #######################

const C = require('./constants.js')

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
const jwt = new oauth2(C.GOOGLE_CLIENT_ID)

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

// A function to check site's active state (whether public users can see the site)
app.get('/api/active/*', function(req, res){
  let url = req.path.substring(req.path.lastIndexOf('/') + 1)
  db.checkSiteActive(url,function(result){
    res.json({'active' : result})
  })
})

// function to set site active flag
// Expects a json object with boolean field "active"
app.post('/api/active/*', function(req, res){
  let url = req.path.substring(req.path.lastIndexOf('/') + 1)
  if(req.payload){
    db.getUserID(C.GOOGLE_SERVICE_ENUM, req.payload.sub, function (id){
      db.updateSiteActive(req.body.active, url, id, function (result){
        res.json({'result' : result})
      })
    })
  } else {
    res.status(403).json({'error': 'Access Denied'})
  }
})

// A function that returns a users payload
app.get('/api/permissions', function(req, res){
  if(req.payload){
    db.getUserID(C.GOOGLE_SERVICE_ENUM, req.payload.sub, function (id){
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
  let site_temp_key = req.get('Temporary-Key')
  db.checkSiteExists(url, function (exists) {
    if (exists)
    {
      db.checkSiteActive(url, function (active){
        if (active) {
          db.getSiteData(url, function (json) {
            if (json === null) res.status(404).json({'error': 'site not found'})
            else res.json(json)
          })
        } else if (false) {//(req.payload) {
          db.getUserID(C.GOOGLE_SERVICE_ENUM, req.payload.sub, function (id){
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
        } else if (true){//site_temp_key) {
          db.getSiteAgeAndTemporaryKey(url, function (temporary_key) {
            if (true)//(site_temp_key === temporary_key)
            {
              db.getSiteData(url, function (json) {
                if (json === null) res.status(404).json({'error': 'site not found'})
                else res.json(json)
              })
            } else {
              res.status(403).json({'error': 'Access Denied'})
            }
          })
        } else { // The site is not active, user is not logged in, and didn't send a temp_key
          res.status(403).json({'error': 'Access Denied'})
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
    if(exists) {
      db.getSiteAgeAndTemporaryKey(url, function(k, age) {
        res.send(!(k && age > C.MAX_TEMP_KEY_SECONDS)) // Pretend the site doesn't exist if it has an old temp key
      })
    } else {
      res.send(false)
    }
  })
})

// Update a site
// A valid token is required to update an existing site with owners
// A valid temp_key is required to save a site without owners. If a token is also sent,
// that user will be assigned ownership.
app.post('/api/site/*', function (req, res) {
  let url = req.path.substring(req.path.lastIndexOf('/') + 1)
  let site_temp_key = req.get('Temporary-Key')
  if (req.payload && (!site_temp_key || site_temp_key === 'undefined')) {
    db.getUserID(C.GOOGLE_SERVICE_ENUM, req.payload.sub, function (id) {
      db.updateSite(url, id, null, req.body, function (success) {
        res.send(success) // Just return success for now, later add error codes possibly
      })
    })
  } else if (req.payload && site_temp_key) {
    console.log("Saving site '" + url + "' for the first time!")
    // New user saving site for the first time
    // createUser will fail safely if the user already exists
    db.getSiteAgeAndTemporaryKey(url, function(temporary_key) {
      if (site_temp_key === temporary_key) {
        db.createUser(req.payload.name, C.GOOGLE_SERVICE_ENUM, req.payload.sub, req.payload.email, function () {
          db.getUserID(C.GOOGLE_SERVICE_ENUM, req.payload.sub, function (id) {
            db.addUserPermission(C.INTERNAL_ID, id, url, C.PERMISSION_OWNER, function () {
              db.updateSite(url, id, '', req.body, function (success) {
                res.send(success)
              })
            })
          })
        })
      } else {
        res.status(403).json({'error' : 'Access Denied'})
      }
    })
    // Saving the site without making an account
  } else if (true){//(site_temp_key) {
    db.getSiteAgeAndTemporaryKey(url, function(temporary_key) {
      if (true){//(site_temp_key === temporary_key) {
        db.updateSite(url, C.INTERNAL_ID, temporary_key, req.body, function (success) {
          res.send(success)
        })
      } else {
        res.status(403).json({'error' : 'Access Denied'})
      }
    })
  } else {
    res.status(403).json({'error' : 'Access Denied'})
  }
})

// Create a new site with the url indicated by the post address
// and sitename sent in the json object { "siteName" : "Example Club" }
// Returns the json object of the new site upon success; false otherwise
app.post('/api/newsite/*', function (req, res) {
  let newSite = function(){
    if (req.payload)
    {
      // Get user db id
      db.getUserID(C.GOOGLE_SERVICE_ENUM, req.payload.sub, function (id) {
        if (!id) {
          // User doesn't exist despite sending this token --> This should never happen here
          res.json({'error' : 'User Not Found'})
        } else {
          db.createNewSite(url, siteName, null, function (json) {
            if (!json) {
              res.json({'error' : 'Unable to create site'})
            } else {
              // Make this logged in user the owner of the site
              db.addUserPermission(0, id, url, 1, function (result) {
                if (!result)
                {
                  // This should also never happen
                  res.json({'error' : 'Error assigning ownership to site "' + url + '"'})
                } else {
                  res.json({'Status' : "Success"}) // Success
                }
              })
            }
          })
        }
      })
    //} else if (req.auth_error){
      //res.json({'error' : 'Invalid Token'})
    } else {
      let temporary_key = crypto.randomBytes(16).toString('hex')
      db.createNewSite(url, siteName, temporary_key, function (json) {
        if (!json) {
          res.json({'error' : 'Error Creating Site'})
        } else {
          res.json({'Temporary-Key': temporary_key})
        }
      })
    }
  }

  let url = req.path.substring(req.path.lastIndexOf('/') + 1)
  let siteName = req.body.siteName

  // If there's already a user logged in
  db.checkSiteExists(url, function (exists) {
    if(exists) {
      db.getSiteAgeAndTemporaryKey(url, function(k, age) {
        if((k && age > C.MAX_TEMP_KEY_SECONDS))
        {
          db.removeSite(url, function() {
            newSite()
          })
        } else {
          res.status(400).json({'error' : 'Site already exists'})
        }
      })
    } else {
      newSite()
    }
  })
})

// Responds with a list of club names and urls for active club sites in the specified subhost, eg. /uvic.club
app.get('/api/directory/*', function (req, res) {
  let subhost = req.path.substring(req.path.lastIndexOf('/') + 1)
  db.getDirectory(subhost, true, function (directory) {
    res.json(directory)
  })
})

// Add a user to the database
// Responds with true if they were added, false otherwise
app.post('/api/newuser', function(req, res) {
  if (req.payload){
    db.createUser(req.payload.name, C.GOOGLE_SERVICE_ENUM, req.payload.sub, req.payload.email, function (result) {
        res.send(result)
    })
  } else {
    res.status(400).json({'error': 'Unable to create new user without valid token'})
  }
})

app.get('/api/*', function (req, res) {
  res.status(404).json({'error': 'Invalid GET Request'})
})

app.post('/api/*', function (req, res) {
  res.status(404).json({'error': 'Invalid POST Request'})
})


// #######################
// #        App          #
// #######################

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/../dist/index.html'))
})

app.listen(C.PORT, function reportRunning () {
  console.log(`[app] running on port ${C.PORT}`)
})
