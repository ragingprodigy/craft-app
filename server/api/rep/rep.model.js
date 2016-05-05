'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RepSchema = new Schema({
  name: String,
  active: Boolean
});

module.exports = mongoose.model('Rep', RepSchema);