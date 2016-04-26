/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var raven = require('raven');
var server = require('http').createServer(app);

/* Sentry Config */
// function onError(err, req, res, next) {
//     // The error id is attached to `res.sentry` to be returned
//     // and optionally displayed to the user for support.
//     res.statusCode = 500;
//     res.end(res.sentry+'\n');
// }

// // The request handler must be the first item
// app.use(raven.middleware.express.requestHandler('{{ SENTRY_DSN }}'));
// // The error handler must be before any other error middleware
// app.use(raven.middleware.express.errorHandler('{{ SENTRY_DSN }}'));

require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening at %s on %d, in %s mode', config.ip, config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;