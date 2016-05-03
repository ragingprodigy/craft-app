'use strict';

var _ = require('lodash');
var Artisan = require('./artisan.model');

// Get list of artisans
exports.index = function(req, res) {
  Artisan.find({})
    .populate('specialty', '_id name description')
    .populate('bankDetails.bank', '_id name')
    .exec(function (err, artisans) {
    if(err) { return handleError(res, err); }
    return res.json(200, artisans);
  });
};

// Get a single artisan
exports.show = function(req, res) {
  Artisan.findById(req.params.id, function (err, artisan) {
    if(err) { return handleError(res, err); }
    if(!artisan) { return res.send(404); }
    return res.json(artisan);
  });
};

// Creates a new artisan in the DB.
exports.create = function(req, res) {
  Artisan.create(req.body, function(err, artisan) {
    if(err) { return handleError(res, err); }
    return res.json(201, artisan);
  });
};

// Updates an existing artisan in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Artisan.findById(req.params.id, function (err, artisan) {
    if (err) { return handleError(res, err); }
    if(!artisan) { return res.send(404); }
    var updated = _.merge(artisan, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, artisan);
    });
  });
};

// Deletes a artisan from the DB.
exports.destroy = function(req, res) {
  Artisan.findById(req.params.id, function (err, artisan) {
    if(err) { return handleError(res, err); }
    if(!artisan) { return res.send(404); }
    artisan.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  //console.log("Artisan Module Error:", err.message);
  
  if (err.name == 'ValidationError') {
    return res.status(400).json({ message: err.message, errors: err.errors });
  }
  
  return res.send(500, err);
}