// Utility script for modifying site data format

const db = require('./api/db.js')

db.rawQuery("SELECT url, temporary_key from CLUBS", function (err, res) {
  for(i = 0; i < res.rowCount; i++)
  {
    const url = res.rows[i].url
    const temporary_key = res.rows[i].temporary_key

    db.getSiteData(url, function (site_data) {

      // Update the data here

      db.updateSite(url, 0, temporary_key, site_data, function (success) {
        if (success)
          console.log(`Updated ${url}.uvic.club site data`)
      })
    })
  }
})
