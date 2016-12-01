// db.js -- api for accessing the database

const pg = require('pg')
const pool = new pg.Pool({
  user: 'clubhub',
  database: 'clubhub',
  host: 'localhost',
})

// #######################
// #   SITE MANAGEMENT   #
// #######################

// Get the site data given its url
const getSiteData = function (url, next) {
  pool.query('SELECT site_data FROM clubs WHERE url=$1::text', [url], function (err, res) {
    if (err || res.rowCount === 0) {
      next(null)
    } else {
      next(res.rows[0].site_data)
    }
  })
}

// Get a list of all sites (either active, or inactive, but not both) for the given subhost
// Inside a json object in the format:
// { sites: [ { name: 'Canoe Club', url: 'canoe' }, { name: 'Webdev Club', url: 'webdev' } ] }
// TODO: Potentially serve more information than just name, url
const getDirectory = function (subhost, active, next) {
  pool.query('SELECT name, url from clubs WHERE subhost=$1::text AND active=$2::boolean ORDER BY name', [subhost, active], function (err, res) {
    if (err || res.rowCount === 0)
    {
      next({sites : []})
    } else {
      next({sites: res.rows})
    }
  })
}

// Given the short url of a site, the userID of the user attempting to update it,
// and an updated json object, update the site's data if the user has access.
// The temporary_key is also updated with the passed value (should either be null or the existing key)
// Also updates the modified_date timestamp to reflect this update.
// Passes on true on success, false if the user didn't have access,
// the site doesn't exist, or there was a database error.
const updateSite = function(url, userID, temporary_key, site_data, next){
  pool.query('SELECT * FROM permissions WHERE user_id = $1::int AND club_id = (SELECT id FROM clubs WHERE url=$2::text)', [userID, url], function(err, res){
   if(err || res.rowCount === 0)
   {
     next(false)
   } else {
     // TODO: Handle corrupted (possibly maliciously) data here and/or when loading it
     pool.query('UPDATE clubs SET (site_data, modified_date, temporary_key) = ($1::json, now(), $2::text) WHERE url=$3::text', [site_data, temporary_key, url], function (err) {
       if (err)
         next(false)
       else
         next(true)
     })
   }
  })
}

// Given a short url and name, check if the short url is taken
// and if it isn't, create the new site.
// Passes on true on success, false if it already exists
// or the database encounters an error
const createNewSite = function(url, name, temporary_key, next){
  url = url.toLowerCase()
  checkSiteExists(url, function(exists){
    if(exists){
      next(false)
    } else {
      // The default data to populate a new site with
      const default_site_data = require('./default_template.json')
      pool.query('INSERT INTO clubs (url, name, temporary_key, site_data) VALUES ($1::text, $2::text, $3::text, $4::json)', [url, name, temporary_key, default_site_data], function (err) {
        if (err) {
          next(false)
        } else {
          next(default_site_data)
        }
      })
    }
  })
}

// Gives true or false depending on whether the site with the given url is in the database
// Does not check if it's active.
const checkSiteExists = function(url, next){
  pool.query('SELECT site_data FROM clubs WHERE url=$1::text', [url], function (err, res) {
    if (err)
      next(null) // If the db fails, we don't know if the site exists or not
    else
      next(res.rowCount === 1)
  })
}

// Gives true or false depending on whether the site with the given url is active
const checkSiteActive = function(url, next) {
  pool.query('SELECT active FROM clubs WHERE url=$1::text', [url], function (err, res){
    if (err || res.rowCount === 0)
      next(null)
    else
      next(res.rows[0].active)
  })
}

// Verify the user has owner access to the site and then update its active status if they do
// ATTENTION: Only user_ids from fresh validated tokens should be passed into this function.
const updateSiteActive = function(state, url, user_id, next){
  pool.query('UPDATE clubs SET active=$1::boolean WHERE id=(SELECT club_id FROM permissions WHERE user_id=$2::int AND permission=1 AND club_id=(SELECT id FROM clubs WHERE url=$3::text))', [state, user_id, url], function (err, res){
    if (err) {
      next(null)
    } else if (res.rowCount === 0) {
      next("Access Denied")
    } else {
      next("Site Active State Updated")
    }
  })
}

// Get the temporary key and the age of the site in seconds
const getSiteAgeAndTemporaryKey = function(url, next){
  pool.query('SELECT temporary_key, EXTRACT(EPOCH FROM (current_timestamp - creation_date)) AS age FROM clubs WHERE url=$1::text', [url], function (err, res) {
    if (err || res.rowCount === 0)
    {
      next(null, null)
    } else {
      next(res.rows[0].temporary_key, res.rows[0].age)
    }
  })
}

const removeSite = function(url, next) {
  pool.query('DELETE FROM clubs WHERE url=$1::text', [url], function (err, res) {
    if (err)
      console.log(err)
    console.log("Deleting site with url " + url + " removed " + res.rowCount + " row(s) from the clubs table")
    next()
  })
}

// #######################
// #   USER MANAGEMENT   #
// #######################

// Create a new user (assumed to be verified data in main.js)
const createUser = function (name, service, user_id, email, next) {
  pool.query('INSERT INTO users (name, service, user_id, email) VALUES ($1::text, $2::int, $3::text, $4::text)', [name, service, user_id, email], function (err, res) {
    if (err) {
      next(false)
    } else {
      next(true)
    }
  })
}

// Given the service and user_id pair, return the actual database id for the user
const getUserID = function (service, user_id, next) {
  pool.query('SELECT id FROM users WHERE service=$1::int AND user_id=$2::text', [service, user_id], function (err, res) {
    if (err || res.rowCount === 0) {
      next(null)
    } else {
      next(res.rows[0].id)
    }
  })
}


// Get a list of every site the user has permissions on
const getUserSitePermissions = function (id, next) {
  pool.query('SELECT clubs.name, clubs.url, permissions.permission FROM clubs JOIN permissions ON permissions.club_id=clubs.id WHERE permissions.user_id=$1::int ORDER BY clubs.name', [id], function (err, res) {
    if (err || res.rowCount === 0)
    {
      next({sites : []})
    } else {
      next({sites: res.rows})
    }
  })
}

// Verify the user has owner access to the site and then update the user's permission for
// that site if they do. A user can modify their own permission downwards this way (Which would be foolish)
// ATTENTION: Only owner_ids from fresh validated tokens should be passed into this function
const updateUserPermission = function (owner_id, user_id, url, permission, next) {

  if (owner_id === 0) // For adding the admin in new site creation
  {
    pool.query('UPDATE permissions SET permission=$1::int WHERE user_id=$2::int AND club_id=(SELECT id FROM clubs WHERE url=$4::text)', [permission, user_id, url], function (err, res) {
      if (err) {
        next(null)
      } else {
        next("User Permission Updated")
      }
    })
  }  else {
    pool.query('UPDATE permissions SET permission=$1::int WHERE user_id=$2::int AND club_id=(SELECT club_id FROM permissions WHERE user_id=$3::int AND permission=1 AND club_id=(SELECT id FROM clubs WHERE url=$4::text))', [permission, user_id, owner_id, url], function (err, res) {
      if (err) {
        next(null)
      } else if (res.rowCount === 0) {
        next("Access Denied") // Technically if the user doesn't have _any_ permissions we'll get this but the client shouldn't generate this request if they don't
      } else {
        next("User Permission Updated")
      }
    })
  }
}

// Remove a user's permission entry for a given club, with a given owner attempting removal.
const removeUserPermission = function (owner_id, user_id, url, permission, next) {
  if (owner_id === 0) // For adding the admin in new site creation
  {
    pool.query('DELETE FROM permissions WHERE user_id=$2::int AND club_id=(SELECT id FROM clubs WHERE url=$2::text)', [permission, user_id, url], function (err, res) {
      if (err) {
        next(null)
      } else {
        next("User Permission Removed")
      }
    })
  }  else {
    pool.query('DELETE FROM permissions WHERE user_id=$2::int AND club_id=(SELECT club_id FROM permissions WHERE user_id=$3::int AND permission=1 AND club_id=(SELECT id FROM clubs WHERE url=$4::text))', [permission, user_id, owner_id, url], function (err, res) {
      if (err) {
        next(null)
      } else if (res.rowCount === 0) {
        next("Access Denied") // Technically if the user doesn't have _any_ permissions we'll get this but the client shouldn't generate this request if they don't
      } else {
        next("User Permission Removed")
      }
    })
  }
}

// Get a user's permission level for a given club
// Returning null if they don't have permissions
// Also return the club_id for use in future queries
const getUserPermission = function (user_id, url, next) {
  pool.query('SELECT permission, club_id FROM permissions WHERE user_id=$1::int AND club_id=(SELECT id FROM clubs WHERE url=$2::text)', [user_id, url], function (err, res) {
    if (err || res.rowCount === 0) {
      next(null)
    } else {
      next(res.rows[0].permission, res.rows[0].club_id)
    }
  })
}

// Add permissions for a user to a club if they didn't already
// have any permission. Use owner_id 0 for internally adding
// the first admin or any other methods of adding permissions internally
const addUserPermission = function (owner_id, user_id, url, permission, next) {
  if (owner_id === 0) // For adding the admin in new site creation
  {
    pool.query('INSERT INTO permissions VALUES ($1::int, (SELECT id FROM clubs WHERE url=$2::text), $3::int)', [user_id, url, permission], function (err, res) {
      if (err) {
        next(null)
      } else {
        next("User Permission Added")
      }
    })
  }  else {
    getUserPermission(owner_id, url, function (owner_permission, club_id) {
      if (owner_permission != 1) {
        next("Access Denied")
      } else {
        pool.query('INSERT INTO permissions VALUES ($1::int, $2::int, $3::int)', [user_id, club_id, permission], function (err, res) {
          if (err) {
            next(null)
          } else {
            next("User Permission Added")
          }
        })
      }
    })
  }
}

// Internal testing only
const rawQuery = function(query, next){
  pool.query(query, next)
}

module.exports = {checkSiteExists, createNewSite, getSiteData, updateSite, rawQuery, getDirectory, updateSiteActive,
  updateUserPermission, getUserPermission, addUserPermission, createUser, getUserID, getUserSitePermissions,
  removeUserPermission, checkSiteActive, getSiteAgeAndTemporaryKey, removeSite}
