/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var env = process.env.NODE_ENV;
var User = require("../api/auth/auth.model");

if (env == 'test') {
  User.find({}).remove(function () {
    // Create Default Admin User
    var user = new User();
    user.name = 'Test User';
    user.username = 'user';
    user.password = user.generateHash('password');
    user.email = "user@craft.io";

    user.save(function () { });
  });
} else {
  User.count({}, function(err, ct) {
    if (err) { console.log(err); }

    if (ct < 1) {
      // Create Default Admin User
      var user = new User();
      user.name = 'Seun Williams';
      user.username = 'testuser';
      user.password = user.generateHash('password');
      user.email = "dapo@softcom.ng";

      user.save(function () { });
    }
  });
}
