'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RepSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  user: { type: Schema.Types.ObjectId, ref: 'Auth' },
  active: { type: Boolean, default: false }
});

module.exports = mongoose.model('Rep', RepSchema);