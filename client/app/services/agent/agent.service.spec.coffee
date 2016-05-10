'use strict'

describe 'Service: $agent', ->

  # load the service's module
  beforeEach module 'craftAppApp'

  # instantiate service
  $agent = undefined
  beforeEach inject (_$agent_) ->
    $agent = _$agent_

  it 'should do something', ->
    expect(!!$agent).toBe true
