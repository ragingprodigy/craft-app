'use strict'

describe 'Service: $artisan', ->

  # load the service's module
  beforeEach module 'craftAppApp'

  # instantiate service
  $artisan = undefined
  beforeEach inject (_$artisan_) ->
    $artisan = _$artisan_

  it 'should do something', ->
    expect(!!$artisan).toBe true
