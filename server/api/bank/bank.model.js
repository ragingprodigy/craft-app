'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BankSchema = new Schema({
  name: String,
  sortCode: String,
  active: Boolean
});

module.exports = mongoose.model('Bank', BankSchema);