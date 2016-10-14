// ToDo: Get NodeJS running with es6 syntax (import)

// #######################
// #      CONSTANTS      #
// #######################

const PORT = require('./constants.js').PORT;

// #######################
// #  SERVER INITIATION  #
// #######################

const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const path = require ('path');

// #######################
// #       ROUTING       #
// #######################

// MIDDLEWARE FUNCTIONS -- app.use()
// provide resources in client path
app.use(express.static(path.join(__dirname + '/../client')));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/../client/template/landing/landing.html'));
});
app.get('/sample', function(req, res) {
  res.sendFile(path.join(__dirname + '/../client/template/sample/sample.html'));
});
// ToDo: Add /join page
app.post('/newclub', function(req, res){
  // ToDo: send back new hubsite page with club data injected!
  res.send(`Welcome, ${req.body.clubName}! It is lovely to have you.`);
});

// Server listens to requests on PORT
app.listen(PORT, function reportRunning() {
  console.log(`Running on port ${PORT}`);
});
