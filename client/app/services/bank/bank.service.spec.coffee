'use strict'

describe 'Service: $bank', ->

  # load the service's module
  beforeEach module 'craftAppApp'

  # instantiate service
  $bank = undefined
  beforeEach inject (_$bank_) ->
    $bank = _$bank_

  it 'should do something', ->
    expect(!!$bank).toBe true
