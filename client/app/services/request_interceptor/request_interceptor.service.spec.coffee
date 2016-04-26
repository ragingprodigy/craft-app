'use strict'

describe 'Service: $requestInterceptor', ->

  # load the service's module
  beforeEach module 'craftAppApp'

  # instantiate service
  $requestInterceptor = undefined
  beforeEach inject (_$requestInterceptor_) ->
    $requestInterceptor = _$requestInterceptor_

  it 'should do something', ->
    expect(!!$requestInterceptor).toBe true
