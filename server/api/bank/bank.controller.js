'use strict';

var _ = require('lodash');
var Bank = require('./bank.model');

// Get list of banks
exports.index = function(req, res) {
  Bank.find({}, '_id name', function (err, banks) {
    if(err) { return handleError(res, err); }
    return res.json(200, banks);
  });
};

// Get a single bank
exports.show = function(req, res) {
  Bank.findById(req.params.id, function (err, bank) {
    if(err) { return handleError(res, err); }
    if(!bank) { return res.send(404); }
    return res.json(bank);
  });
};

// Creates a new bank in the DB.
exports.create = function(req, res) {
  Bank.create(req.body, function(err, bank) {
    if(err) { return handleError(res, err); }
    return res.json(201, bank);
  });
};

// Updates an existing bank in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Bank.findById(req.params.id, function (err, bank) {
    if (err) { return handleError(res, err); }
    if(!bank) { return res.send(404); }
    var updated = _.merge(bank, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, bank);
    });
  });
};

// Deletes a bank from the DB.
exports.destroy = function(req, res) {
  Bank.findById(req.params.id, function (err, bank) {
    if(err) { return handleError(res, err); }
    if(!bank) { return res.send(404); }
    bank.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}