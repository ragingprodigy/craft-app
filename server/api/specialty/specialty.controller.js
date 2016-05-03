'use strict';

var _ = require('lodash');
var Specialty = require('./specialty.model');

// Get list of specialtys
exports.index = function(req, res) {
  Specialty.find({}, '_id name description', function (err, specialtys) {
    if(err) { return handleError(res, err); }
    return res.json(200, specialtys);
  });
};

// Get a single specialty
exports.show = function(req, res) {
  Specialty.findById(req.params.id, function (err, specialty) {
    if(err) { return handleError(res, err); }
    if(!specialty) { return res.send(404); }
    return res.json(specialty);
  });
};

// Creates a new specialty in the DB.
exports.create = function(req, res) {
  Specialty.create(req.body, function(err, specialty) {
    if(err) { return handleError(res, err); }
    return res.json(201, specialty);
  });
};

// Updates an existing specialty in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Specialty.findById(req.params.id, function (err, specialty) {
    if (err) { return handleError(res, err); }
    if(!specialty) { return res.send(404); }
    var updated = _.merge(specialty, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, specialty);
    });
  });
};

// Deletes a specialty from the DB.
exports.destroy = function(req, res) {
  Specialty.findById(req.params.id, function (err, specialty) {
    if(err) { return handleError(res, err); }
    if(!specialty) { return res.send(404); }
    specialty.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}