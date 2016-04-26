'use strict'

describe 'Controller: BankCtrl', ->

  # load the controller's module
  beforeEach module 'craftAppApp'
  BankCtrl = undefined
  scope = undefined

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    BankCtrl = $controller 'BankCtrl',
      $scope: scope

  it 'should ...', ->
    expect(1).toEqual 1
