// ToDo: Get NodeJS running with es6 syntax (import)

// #######################
// #      CONSTANTS      #
// #######################

const PORT = require('./constants.js').PORT

// #######################
// #  SERVER INITIATION  #
// #######################

const express = require('express')
const app = express()
const server = require('http').Server(app)

// #######################
// #       ROUTING       #
// #######################

// ToDo: Fix below (returns error every time)
app.get('/', function(req, res, err) {
	if (err) console.log(`data get error: ${err}`)
	else {
		res.send('<h1>Im Running!!</h1>')
	}
})

// Server listens to requests on PORT
app.listen(PORT, function reportRunning() {
	console.log(`Running on port ${PORT}`)
})
