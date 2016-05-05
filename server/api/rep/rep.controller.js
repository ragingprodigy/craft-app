'use strict';

var _ = require('lodash');
var Rep = require('./rep.model');

// Get list of reps
exports.index = function(req, res) {
  Rep.find(function (err, reps) {
    if(err) { return handleError(res, err); }
    return res.json(200, reps);
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
  Rep.findById(req.params.id, function (err, rep) {
    if (err) { return handleError(res, err); }
    if(!rep) { return res.send(404); }
    var updated = _.merge(rep, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, rep);
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