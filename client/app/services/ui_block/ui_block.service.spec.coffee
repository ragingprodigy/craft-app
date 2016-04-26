'use strict'

describe 'Service: $uiBlock', ->

  # load the service's module
  beforeEach module 'craftAppApp'

  # instantiate service
  $uiBlock = undefined
  beforeEach inject (_$uiBlock_) ->
    $uiBlock = _$uiBlock_

  it 'should do something', ->
    expect(!!$uiBlock).toBe true
