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

// #######################
// #       ROUTING       #
// #######################

// MIDDLEWARE FUNCTIONS -- app.use()
// parses request body and places it into 'req.body'; supports URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.send('<h1>Welcome to clubhub!</h1>');
});
  app.post('/newclub', function(req, res){
  // ToDo: send back new hubsite page with club data injected!
  res.send(`Welcome, ${req.body.clubName}! It is lovely to have you.`);
});

// Server listens to requests on PORT
app.listen(PORT, function reportRunning() {
  console.log(`Running on port ${PORT}`);
});
