'use strict'

describe 'Service: craftAuth', ->

  # load the service's module
  beforeEach module 'craftAppApp'

  # instantiate service
  craftAuth = undefined
  beforeEach inject (_craftAuth_) ->
    craftAuth = _craftAuth_

  it 'should do something', ->
    expect(!!craftAuth).toBe true
