'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var _ = require('lodash');

describe('GET /api/artisans', function() {

  it('should fail without an Authorization Token', function(done) {
    request(app)
      .get('/api/artisans')
      .expect(401)
      .expect('Content-Type', /json/)
      .end(function(err) {
        done(err);
      });
  });

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/artisans')
      .set('Authorization', process.env.AUTH_TOKEN)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('POST /api/artisans', function() {

  it('should fail without an Authorization Token', function(done) {
    request(app)
      .post('/api/artisans')
      .expect(401)
      .expect('Content-Type', /json/)
      .end(function(err) {
        done(err);
      });
  });

  it('should fail without valid entries', function(done) {
    request(app)
      .post('/api/artisans')
      .set('Authorization', process.env.AUTH_TOKEN)
      .send({
          firstName: "",
          middleName: "Ola"
      })
      .expect(400)
      .expect(function (res) {
        if (!('message' in res.body)) throw new Error("missing message object");
        if (!('errors' in res.body)) throw new Error("missing errors object");

      })
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);

        // var message = res.body.message;
        // res.body.message.should.be('Validation failed');
        //
        // var errKeysSize = _.keys(res.body.errors).length;
        // console.log("Error Keys:::", errKeysSize);
        // errKeysSize.should.be(5);
        done();
      });
  });
});