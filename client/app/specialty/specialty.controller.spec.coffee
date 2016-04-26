'use strict'

describe 'Controller: SpecialtyCtrl', ->

  # load the controller's module
  beforeEach module 'craftAppApp'
  SpecialtyCtrl = undefined
  scope = undefined

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    SpecialtyCtrl = $controller 'SpecialtyCtrl',
      $scope: scope

  it 'should ...', ->
    expect(1).toEqual 1
