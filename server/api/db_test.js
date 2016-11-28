// Testing script for db.js
// Expects user 1 to have owner acesss to test123, a site that exists, and user 4 to not have any access
// Expects user 2 to exist.
// Expects the site dsfsdf to not exist

const db = require('./db.js')

console.log("Beginning async db tests. No messages produced on success except for data loading functions.")
console.log("Press Ctrl+C to end, or wait for db timeout")

db.getSiteData('test123', function(json) {
  console.log("getSiteData('test123') expects  {\"updated\":33} | actual: " + JSON.stringify(json))
})

db.getSiteData('dsfsdf', function(json) {
  if (json)
    console.log("TEST FAILURE: getSiteData('dsfsdf') " + JSON.stringify(json))
})

db.checkSiteExists('test123', function(exists) {
  if (!exists)
    console.log("TEST FAILURE: checkSiteExists('test123') = " + exists)
})

db.checkSiteExists('dsfsdf', function(exists) {
  if (exists)
    console.log("TEST FAILURE: checkSiteExists('dsfsdf') = " + exists)
})

db.createNewSite('test123', 'Testing Club', function(success) {
  if(success)
    console.log("TEST FAILURE: createNewSite('test123') = " + success)
})

db.rawQuery('DELETE FROM clubs WHERE url=\'175d2fba54c496095f19df4d1d9a12bd3ec0242ebae188d46938922be9a9e362\'', function (err){
  if (err)
    console.log(err)
  else
    db.createNewSite('175d2fba54c496095f19df4d1d9a12bd3ec0242ebae188d46938922be9a9e362', 'Testing Club 2', function(success) {
      if (!success)
        console.log("TEST FAILURE: createNewSite #2 result = " + success)
    })
})

db.updateSite('test123', 1, { updated: 33}, function (success) {
  if (!success)
    console.log("TEST FAILURE: updateSite('test123') via user 1 = " + success)
})

db.getDirectory('uvic.club', false, function (result){
  console.log("Dumping club directory: " + JSON.stringify(result).substring(0, 50))
})

db.updateSiteActive(true, 'test123', 1, function (result){
  if (result !== 'Site Active State Updated')
    console.log("TEST FAILURE: Set test123 site to active via user 1: " + result)
})

db.updateSiteActive(false, 'test123', 4, function (result){
  if (result !== 'Access Denied')
    console.log("TEST FAILURE: Set test123 site to active via user 4: " + result)
})

db.updateUserPermission(1, 2, 'test123', 1, function (result) {
  if (result !== 'User Permission Updated')
    console.log("TEST FAILURE: Update user 2's permission on test123 via user 1: " + result)
})

db.updateUserPermission(4, 2, 'test123', 1, function (result) {
  if (result !== 'Access Denied')
    console.log("TEST FAILURE: Update user 2's permission on test123 via user 4: " + result)
})

db.getUserPermission(1, 'test123', function (permission, club_id) {
  if(permission !== 1 || club_id != 49)
    console.log("TEST FAILURE: User 1's permission on test123: " + permission + ", club_id: " + club_id)
})

db.addUserPermission(0, 1, 'test123', 1, function (result) {
  if (result)
    console.log("TEST FAILURE: Give User 1 permission on test123 via internals: " + result)
})

db.addUserPermission(4, 1, 'test123', 1, function (result) {
  if (result !== 'Access Denied')
    console.log("TEST FAILURE: Give User 1 permission on test123 via user 4: " + result)
})

db.createUser('Josh', 1, 76234616274, 'josh@pres.com', function (result){
  if (result) {
    console.log("TEST FAILURE: Add (existing) user Josh: " + result)
  }
})
