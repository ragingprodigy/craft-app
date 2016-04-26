'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SpecialtySchema = new Schema({
  name: String,
  description: String,
  active: Boolean
});

module.exports = mongoose.model('Specialty', SpecialtySchema);