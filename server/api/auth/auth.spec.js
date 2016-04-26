'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /auth/login', function() {
  
  it('should fail for wrong credentials', function(done) {
    
    request(app).post('/auth/login')
      .send({
        username: "hello",
        password: "world"
      })
      .expect(401, {
        message: "Wrong username and/or password"
      })
      .expect('Content-Type', /json/)
      .end(function(err) {
        if (err) return done(err);
        done(); 
      });
  });
  
  it('should return token and user object for correct user credentials', function(done) {
    request(app).post('/auth/login')
      .send({ username: "user", password: "password" })
      .expect(200)
      .expect(function (res) {
          if (!('token' in res.body)) throw new Error("missing token");
          if (!('user' in res.body)) throw new Error("missing user object");
      })
      .expect('Content-Type', /json/)
      .end(function(err) {
        if (err) return done(err);
        done(); 
      });
  });

  it('should fail if username is absent', function(done) {
    request(app).post('/auth/login')
      .send({ password: "password" })
      .expect(400, { message: "Please provide both username and password." })
      .expect('Content-Type', /json/)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
  });

  it('should fail if password is absent', function(done) {
    request(app).post('/auth/login')
      .send({ username: "password" })
      .expect(400, { message: "Please provide both username and password." })
      .expect('Content-Type', /json/)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
  });

  // xit('should respond with JSON array', function(done) {
  //   this.timeout(20000);
  //
  //   request(app)
  //     .get('/auth')
  //     .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NzFmNDllMTJmMjRlNGU2MTNlM2QxODUiLCJ1c2VybmFtZSI6InRlc3R1c2VyIiwicm9sZSI6ImJhY2tlbmQtdXNlciIsIm5hbWUiOiJTZXVuIFdpbGxpYW1zIiwibGFzdExvZ2luIjoiMjAxNi0wNC0yNlQxMToyMDowMi4wNDhaIiwiaWF0IjoxNDYxNjY5NjAyLCJleHAiOjE0NjI4NzkyMDJ9.TIAPPH2zPtfMOd9pf6kJQLV16RMl8L9if2CBJEUOI1c')
  //     .expect(200)
  //     .expect('Content-Type', /json/)
  //     .end(function(err, res) {
  //       if (err) return done(err);
  //       res.body.should.be.instanceof(Array);
  //       done();
  //     });
  // });
});