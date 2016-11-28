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
  pool.query('SELECT id, active, site_data FROM clubs WHERE url=$1::text', [url], function (err, res) {
    if (err || res.rowCount === 0) {
      next(null)
    } else {
      let site = res.rows[0]
      // Placeholder logic
      if (true || site.active) {
        next(site.site_data)
      } else {
        // TODO: Verify the user requesting the site has admin or editor credentials before sending the data back
      }
    }
  })
}

// Get a list of all sites (either active, or inactive, but not both) for the given subhost
// Inside a json object in the format:
// { sites: [ { name: 'Canoe Club', url: 'canoe' }, { name: 'Webdev Club', url: 'webdev' } ] }
const getDirectory = function (subhost, active, next) {
  pool.query('SELECT name, url from clubs WHERE subhost=$1::text AND active=$2::boolean', [subhost, active], function (err, res) {
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
// Also updates the modified_date timestamp to reflect this update.
// Passes on true on success, false if the user didn't have access,
// the site doesn't exist, or there was a database error.
const updateSite = function(url, userID, site_data, next){
  pool.query('SELECT * FROM permissions WHERE user_id = $1::int AND club_id = (SELECT id FROM clubs WHERE url=$2::text)', [userID, url], function(err, res){
   if(false) //err || res.rowCount === 0)
     next(false)
   else
     //TODO: Handle corrupted (possibly maliciously) data here and/or when loading it
     pool.query('UPDATE clubs SET (site_data, modified_date) = ($1::json, now()) WHERE url = $2::text', [site_data, url], function(err) {
       if (err)
         next(false)
       else
         next(true)
     })
  })
}

// Given a short url and name, check if the short url is taken
// and if it isn't, create the new site.
// Passes on true on success, false if it already exists
// or the database encounters an error
const createNewSite = function(url, name, next){
  url = url.toLowerCase()
  checkSiteExists(url, function(exists){
    if(exists){
      next(false)
    } else {
      // The default data to populate a new site with
      const default_site_data = require('./default_template.json')
      pool.query('INSERT INTO clubs (url, name, active, site_data, creation_date, modified_date) VALUES ($1::text, $2::text, false, $3::json, current_timestamp, current_timestamp)', [url, name, default_site_data], function (err) {
        if (err)
          next(false)
        else
          next(default_site_data)
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

// #######################
// #   USER MANAGEMENT   #
// #######################


// Verify the user has owner access to the site and then update the user's permission for
// that site if they do. A user can modify their own permission downwards this way (Which would be foolish)
// ATTENTION: Only owner_ids from fresh validated tokens should be passed into this function
const updateUserPermission = function (owner_id, user_id, url, permission, next) {
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

module.exports = {checkSiteExists, createNewSite, getSiteData, updateSite, rawQuery, getDirectory, updateSiteActive, updateUserPermission, getUserPermission, addUserPermission}
