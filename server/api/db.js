// db.js -- api for accessing the database

const pg = require('pg')
const pool = new pg.Pool({
  user: 'clubhub',
  database: 'clubhub',
  host: 'localhost',
})

// Get the site data given its url
const getSiteData = function (url, next) {
  pool.query('SELECT site_data FROM clubs WHERE url=$1::text', [url], function (err, res) {
    if (err || res.rowCount === 0)
      next(null)
    else
      next(res.rows[0].site_data)
    })
}

// Given the short url of a site, the userID of the user attempting to update it,
// and an updated json object, update the site's data if the user has access.
// Passes on true on success, false if the user didn't have access,
// the site doesn't exist, or there was a database error.
const updateSite = function(url, userID, site_data, next){
  pool.query('SELECT * FROM admins WHERE user_id = $1::int AND club_id = (SELECT id FROM clubs WHERE url=$2::text)', [userID, url], function(err, res){
   if(err || res.rowCount === 0)
     next(false)
   else
     //TODO: Handle corrupted (possibly maliciously) data here and/or when loading it
     pool.query('UPDATE clubs SET site_data = $1::json WHERE url = $2::text', [site_data, url], function(err) {
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
    }else{
      // The default data to populate a new site with
      const default_site_data = require('./default_template.json')
      pool.query('INSERT INTO clubs (url, name, active, site_data, creation_date, modified_date) VALUES ($1::text, $2::text, false, $3::json, current_timestamp, current_timestamp)', [url, name, default_site_data], function (err) {
        if (err)
          next(false)
        else
          next(true)
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

// Internal testing only
const rawQuery = function(query, next){
  pool.query(query, next)
}

module.exports = {checkSiteExists, createNewSite, getSiteData, updateSite, rawQuery}
