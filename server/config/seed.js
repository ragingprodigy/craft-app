/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var env = process.env.NODE_ENV;
var User = require("../api/auth/auth.model");
var Rep = require("../api/rep/rep.model");

if (env == 'test') {
  Rep.find({}).remove(function () {
    // Create Default Craft Rep
    Rep.create({
      name: "Test Rep",
      active: true
    }, function (e, rep) {
      User.find({}).remove(function () {
        // Create Default Admin User
        var user = new User();
        user.name = 'Test User';
        user.username = 'user';
        user.password = user.generateHash('password');
        user.email = "user@craft.io";
        user.rep = rep._id;

        user.save(function () {
          rep.user = user._id;
          rep.save();
        });
      });
    });
  });
} else {
  Rep.count({}, function (err, ct) {
    if (ct < 1) {
      Rep.create({
        name: "Test Rep",
        active: true
      }, function (err, rep) {
        // Create Default Craft Rep
        var user = new User();
        user.name = 'Victor Ashafa';
        user.username = 'testuser';
        user.password = user.generateHash('password');
        user.email = "dapo@craft.ng";
        user.rep = rep._id;

        user.save(function () {
          rep.user = user._id;
          rep.save();
        });
      });
    }
  });

  User.count({}, function(err, ct) {
    if (err) { console.log(err); }

    if (ct < 1) {
      // Create Default Craft Rep
      var user = new User();
      user.name = 'Seun Williams';
      user.username = 'testadmin';
      user.password = user.generateHash('password');
      user.email = "dapo@softcom.ng";

      user.save(function () { });
    }
  });
}
