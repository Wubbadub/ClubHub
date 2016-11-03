// Testing script for db.js
// All calls are asynchronous and may finish in any order
// TODO: Actually test for success/failure instead of requiring manual console inspection

const db = require('./db.js')

db.getSiteData('test123', function(json) {
  console.log("getSiteData('test123') " + JSON.stringify(json))
})

db.getSiteData('asdf', function(json) {
  console.log("getSiteData('asdf') " + JSON.stringify(json))
})

db.checkSiteExists('test123', function(exists) {
  console.log("checkSiteExists('test123') = " + exists)
})

db.checkSiteExists('dsfsdf', function(exists) {
  console.log("checkSiteExists('asdf') = " + exists)
})

db.createNewSite('test123', 'Testing Club', function(success) {
  console.log("createNewSite('test123') = " + success)
})

// This test shouldn't work on the production server
db.rawQuery('DELETE FROM clubs WHERE url=\'175d2fba54c496095f19df4d1d9a12bd3ec0242ebae188d46938922be9a9e362\'', function (err){
  if (err)
    console.log(err)
  else
    db.createNewSite('175d2fba54c496095f19df4d1d9a12bd3ec0242ebae188d46938922be9a9e362', 'Testing Club 2', function(success) {
      console.log("createNewSite #2 result = " + success)
    })
})
