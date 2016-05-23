'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArtisanSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Artisan first name is required']
  },
  surname: {
    type: String,
    required: [true, 'Artisan surname is required']
  },
  middleName: {
    type: String,
    required: false
  },
  businessName:{
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: [true, 'Artisan phone number is required'],
    minlength: 9,
    maxlength: 13
  },
  address: {
    type: String, 
    required: [true, 'Artisan address is required']
  },
  email: String,
  profileUrl: String,  // Url to the Uploaded Image
  identification: String,  // Url to the Uploaded Image
  bankDetails: {
    nubanNumber: { type: String, minlength: 10, maxlength: 10 },
    accountName: String,
    bank: { type: Schema.Types.ObjectId, ref: "Bank" }
  },
  certifications: [{
    title: String,
    url: String // Url to Uploaded Image
  }],
  guarantors: [{
    name: String,
    phone: {
      type: String,
      minlength: 9,
      maxlength: 13
    },
    address: String
  }], // Should be at least TWO
  workPictures: [{
    title: String,
    url: String // Url to Uploaded Image
  }],
  specialty: { type: Schema.Types.ObjectId, ref: "Specialty", required: [true, "Specialty is required"] },
  location: {
    type: [Number] // [<longitude>, <latitude>]
  },
  rep: { type: Schema.Types.ObjectId, ref: "Rep", required: true },
  active: Boolean,
  deleted: { type: Boolean, default: false },
  deletedAt: Date,
  deletedBy: { type: Schema.Types.ObjectId, ref: "Rep", required: false }
});

ArtisanSchema.index({ location: '2d', specialty: 1 });

module.exports = mongoose.model('Artisan', ArtisanSchema);