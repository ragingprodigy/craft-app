/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/reps', require('./api/rep'));
  app.use('/api/meta/banks', require('./api/bank'));
  app.use('/api/meta/specialties', require('./api/specialty'));
  app.use('/api/artisans', require('./api/artisan'));
  app.use('/auth', require('./api/auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
