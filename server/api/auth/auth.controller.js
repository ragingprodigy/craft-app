'use strict';

var _ = require('lodash'),
    jwt = require('jwt-simple'),
    moment = require('moment');
    
var Auth = require('./auth.model');

// Create JSON Web Token
function createJWT(user) {

    var payload = {
        sub: user._id,
        username: user.username,
        role: user.role,
        name: user.name,
        rep: user.rep ? user.rep._id : "",
        lastLogin: new Date(),
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, process.env.SESSION_SECRET);
}

/**
 * Reset password to default
 *
 * @param req
 * @param res
 */
exports.resetPassword = function (req, res) {
  Auth.findById(req.body.id, function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.send(404); }

    user.password = user.generateHash('password');
    user.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(201, { message: 'Password reset successful!' });
    });
  });
};

// Get list of auths
exports.index = function(req, res) {
  Auth.find(function (err, auths) {
    if(err) { return handleError(res, err); }
    return res.json(200, auths);
  });
};

// Get a single auth
exports.show = function(req, res) {
  Auth.findById(req.params.id, function (err, auth) {
    if(err) { return handleError(res, err); }
    if(!auth) { return res.send(404); }
    return res.json(auth);
  });
};

// Creates a new auth in the DB.
exports.create = function(req, res) {
  Auth.create(req.body, function(err, auth) {
    if(err) { return handleError(res, err); }
    return res.json(201, auth);
  });
};

// Updates an existing auth in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Auth.findById(req.params.id, function (err, auth) {
    if (err) { return handleError(res, err); }
    if(!auth) { return res.send(404); }
    var updated = _.merge(auth, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, auth);
    });
  });
};

// Deactivates a User
exports.destroy = function(req, res) {
  Auth.findById(req.params.id, function (err, auth) {
    if(err) { return handleError(res, err); }
    if(!auth) { return res.send(404); }
    auth.active = false;
    
    auth.save(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

/**
 * Handle Login Requests
 *
 * @param req
 * @param res
 * @returns {*}
 */
exports.signIn = function(req, res) {
  if (!('username' in req.body) || !('password' in req.body)) {
    return res.status(400).json({ message: "Please provide both username and password." })
  }
  
  Auth.findOne({ username: req.body.username }, '+password').populate('rep', 'name').exec(function(err, user) {
    if (err) { return handleError(res, err); }
    
    if (!user) { return res.status(401).send({ message: 'Wrong username and/or password' }); }
    if (!user.active) { return res.status(401).send({ message: 'User account has been deactivated. Please contact an administrator.' }); }
    
    user.validPassword(req.body.password, function(err, isMatch) {
      if (err) { return handleError(res, err); }
      
      if (!isMatch) { return res.status(401).send({ message: 'Wrong username and/or password' }); }

      Auth.update({_id: user._id}, {
        lastLogin: new Date(),
        lastLoginFrom: req.headers['x-forwarded-for'] || req.connection.remoteAddress
      }, function() {
        res.send({ token: createJWT(user), user: _.omit(user.toObject(), ['password']) });
      });
    });
  });
};

// Handle Password Changing Requests
exports.changePassword = function(req, res) {
  
};

function handleError(res, err) {
  // TODO: Write this Log to a File Somewhere or send it to a service
  console.log("Auth module error", err);
  
  return res.send(500, err);
}