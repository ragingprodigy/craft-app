/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require("../api/auth/auth.model");
    

User.count({}, function(err, ct) {
  if (err) { console.log(err); }
  
  if (ct< 1) {
    // Create Default Admin User
    var user = new User();
    user.name = 'Seun Williams';
    user.username = 'testuser';
    user.password = user.generateHash('password');
    user.email = "dapo@softcom.ng";

    user.save();
  }
});