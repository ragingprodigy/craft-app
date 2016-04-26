'use strict'

describe 'Service: $specialty', ->

  # load the service's module
  beforeEach module 'craftAppApp'

  # instantiate service
  $specialty = undefined
  beforeEach inject (_$specialty_) ->
    $specialty = _$specialty_

  it 'should do something', ->
    expect(!!$specialty).toBe true
