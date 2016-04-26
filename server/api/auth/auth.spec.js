'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /auth/login', function() {
  
  xit('should fail for wrong credentials', function(done) {
    this.timeout(10000);
    
    request(app).post('/auth/login')
      .send({
        username: "hello",
        password: "world"
      })
      .expect(401, {
        message: "Wrong username and/or password"
      })
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        done(); 
      });
  });

  xit('should respond with JSON array', function(done) {
    this.timeout(20000);
    
    request(app)
      .get('/auth')
      .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NzFmNDllMTJmMjRlNGU2MTNlM2QxODUiLCJ1c2VybmFtZSI6InRlc3R1c2VyIiwicm9sZSI6ImJhY2tlbmQtdXNlciIsIm5hbWUiOiJTZXVuIFdpbGxpYW1zIiwibGFzdExvZ2luIjoiMjAxNi0wNC0yNlQxMToyMDowMi4wNDhaIiwiaWF0IjoxNDYxNjY5NjAyLCJleHAiOjE0NjI4NzkyMDJ9.TIAPPH2zPtfMOd9pf6kJQLV16RMl8L9if2CBJEUOI1c')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});