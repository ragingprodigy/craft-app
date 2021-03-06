'use strict';

var _ = require('lodash');
var Artisan = require('./artisan.model'),
  mailer = require('../../components/tools/mailer');

// Get list of artisans
exports.index = function(req, res) {
  var query = Artisan.find({ deleted: false });

  if (!req.query.lean) {
    query.populate('specialty', '_id name description')
  }

  query.populate('bankDetails.bank', '_id name')
      .populate('rep', '_id name')
      .exec(function (err, artisans) {
        if(err) { return handleError(res, err); }
        return res.json(200, artisans);
      });
};

// Get list of artisans (including deleted records)
exports.all = function(req, res) {
  var query = Artisan.find({ });

  if (!req.query.lean) {
    query.populate('specialty', '_id name description')
  }

  query.populate('bankDetails.bank', '_id name')
      .populate('rep', '_id name')
      .populate('deletedBy', '_id name')
      .exec(function (err, artisans) {
        if(err) { return handleError(res, err); }
        return res.json(200, artisans);
      });
};

// Get a single artisan
exports.show = function(req, res) {
  getArtisan(req.params.id, function (a) {
    return res.json(a);
  });
};

// Creates a new artisan in the DB.
exports.create = function(req, res) {
  req.body.rep = req.rep;
  req.body.specialty = req.body.specialty._id;

  if (req.body.bankDetails != undefined) {
    req.body.bankDetails.bank = req.body.bankDetails.bank._id;
  }

  Artisan.create(req.body, function(err, artisan) {
    if(err) { return handleError(res, err); }

    mailer.sendWelcomeSMS(artisan, function (err) {
      console.log('SMS ERROR: ', err);
      return res.json(201, artisan);
    });
  });
};

// Updates an existing artisan in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }

  if (req.body.rep != undefined) {
    req.body.rep = req.rep;
  }
  if (req.body.specialty != undefined) {
    req.body.specialty = req.body.specialty._id;
  }

  if (req.body.bankDetails != undefined) {
    req.body.bankDetails.bank = req.body.bankDetails.bank._id;
  }

  Artisan.findById(req.params.id, function (err, artisan) {
    if (err) { return handleError(res, err); }
    if(!artisan) { return res.send(404); }
    var updated = _.merge(artisan, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      getArtisan(artisan._id, function (a) {
        return res.json(a);
      });
    });
  });
};

/**
 * Add a new Work Pic
 * @param req
 * @param res
 */
exports.newWorkPic = function (req, res) {
  Artisan.findById(req.params.id, function (err, artisan) {
    if (err) { return handleError(res, err); }
    if(!artisan) { return res.send(404); }

    artisan.workPictures.push(_.pick(req.body, ['url', 'title']));
    artisan.save(function (err) {
      if (err) { return handleError(res, err); }
      
      getArtisan(artisan._id, function (a) {
        return res.json(a);
      });
    });
  });
};

/**
 * Delete a Work Picture
 *
 * @param req
 * @param res
 */
exports.removeWorkPic = function (req, res) {
  Artisan.findById(req.params.id, function (err, artisan) {
    if (err) { return handleError(res, err); }
    if(!artisan) { return res.send(404); }

    artisan.workPictures.id(req.params.pictureId).remove();

    artisan.save(function (err) {
      if (err) { return handleError(res, err); }
      getArtisan(artisan._id, function (a) {
        return res.json(a);
      });
    });
  });
};

// Soft delete an artisan
exports.destroy = function(req, res) {
  Artisan.findById(req.params.id, function (err, artisan) {
    if(err) { return handleError(res, err); }
    if(!artisan) { return res.send(404); }

    artisan.deleted = true;
    artisan.deletedAt = new Date();
    artisan.deletedBy = req.user;

    artisan.save(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function getArtisan(id, callback) {
  Artisan.findById(id)
    .populate('bankDetails.bank', '_id name')
    .populate('rep', '_id name')
    .populate('specialty', '_id name description')
    .populate('deletedBy', '_id name')
    .exec(function (err, a) {
      if (err) { return handleError(res, err); }
      return callback(a);
    });
}

function handleError(res, err) {
  console.log(err);
  if (err.name == 'ValidationError') {
    return res.status(400).json({ message: err.message, errors: err.errors });
  }
  
  return res.send(500, err);
}