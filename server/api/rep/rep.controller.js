'use strict';

var _ = require('lodash');
var Rep = require('./rep.model'),
    User = require('../auth/auth.model');

// Get list of reps
exports.index = function(req, res) {
  Rep.find({}).populate('user').exec(function (err, reps) {
    if(err) { return handleError(res, err); }
    return res.json(200, reps);
  });
};

/**
 * Create an account for the specified representative
 *
 * @param req
 * @param res
 */
exports.createAccount = function (req, res) {
  if (!req.body._id) { return res.status(400).json({message: 'Invalid request'}); }

  Rep.findById(req.body._id, function (err, rep) {
    if(err) { return handleError(res, err); }
    if(!rep) { return res.send(404); }

    if (rep.user) { return res.status(409).json({ message: 'User account already exists' }); }

    // Create User account
    var user = new User();
    user.name = rep.name;
    user.username = req.body.username || rep.name.split(' ').join('').substr(0, 8);
    user.password = req.body.password || user.generateHash('password');
    user.email = rep.email;
    user.rep = rep._id;

    user.save(function () {
      rep.user = user._id;
      rep.save( function () {
        return res.status(201).json(user);
      });
    });
  });
};

/**
 * Activate Agent and User account
 *
 * @param req
 * @param res
 * @returns {*}
 */
exports.activate = function (req, res) {
  if (!req.body.id) { return res.status(400).json({message: 'Invalid request'}); }

  Rep.findById(req.body.id, function (err, rep) {
    if(err) { return handleError(res, err); }
    if(!rep) { return res.send(404); }

    if (rep.active) { return res.status(409).json({ message: 'Agent is activated already' }); }

    rep.active = true;
    rep.save(function () {
      if (!rep.user) { return res.json({ status: true }); }

      User.findById(rep.user, function (e, user) {
        user.active = true;
        user.save(function () {
          return res.json({ status: true });
        });
      });
    });
  });
};

/**
 * Deactivate Agent and User account
 *
 * @param req
 * @param res
 * @returns {*}
 */
exports.deactivate = function (req, res) {
  if (!req.body.id) { return res.status(400).json({message: 'Invalid request'}); }

  Rep.findById(req.body.id, function (err, rep) {
    if(err) { return handleError(res, err); }
    if(!rep) { return res.send(404); }

    if (!rep.active) { return res.status(409).json({ message: 'Agent is deactivated already' }); }

    rep.active = false;
    rep.save(function () {
      if (!rep.user) { return res.json({ status: false }); }

      User.findById(rep.user, function (e, user) {
        user.active = false;
        user.save(function () {
          return res.json({status: false});
        });
      });
    });
  });
};

// Get a single rep
exports.show = function(req, res) {
  Rep.findById(req.params.id, function (err, rep) {
    if(err) { return handleError(res, err); }
    if(!rep) { return res.send(404); }
    return res.json(rep);
  });
};

// Creates a new rep in the DB.
exports.create = function(req, res) {
  Rep.create(req.body, function(err, rep) {
    if(err) { return handleError(res, err); }
    return res.json(201, rep);
  });
};

// Updates an existing rep in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  if(req.body.user) { delete req.body.user; }

  Rep.findById(req.params.id, function (err, rep) {
    if (err) { return handleError(res, err); }
    if(!rep) { return res.send(404); }
    var updated = _.merge(rep, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }

      Rep.findById(req.params.id).populate('user').exec(function (err, _rep) {
        if(err) { return handleError(res, err); }
        return res.json(200, _rep);
      });
    });
  });
};

// Deletes a rep from the DB.
exports.destroy = function(req, res) {
  Rep.findById(req.params.id, function (err, rep) {
    if(err) { return handleError(res, err); }
    if(!rep) { return res.send(404); }
    rep.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}