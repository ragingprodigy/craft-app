'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');

var AuthSchema = new Schema({
  name: String,
  role: { type: String, default: "backend-user" },
  username: String,
  password: { type: String, select: false },
  email: String,
  resetToken: String,
  lastLogin: { type: Date, select: false },
  lastLoginFrom: { type: String, select: false },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: "Auth" },
  active: { type: Boolean, default: true }
});

// generating a hash
AuthSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
AuthSchema.methods.validPassword = function(password, done) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        done(err, isMatch);
    });
};

module.exports = mongoose.model('Auth', AuthSchema);