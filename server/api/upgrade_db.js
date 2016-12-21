// Utility script for modifying site data format

const db = require('./api/db.js')

db.rawQuery("SELECT url from CLUBS", function (err, res) {
  for(i = 0; i < res.rowCount(); i++)
  {
    let url = res.row[i].url
    db.getSiteData(url, function (site_data) {

      // Update the data here

      db.updateSite(url, site_data, function (success) {
        if (success)
          console.log(`Updated ${url}.uvic.club site data`)
      })
    })
  }
})
