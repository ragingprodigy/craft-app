'use strict'

describe 'Controller: AgentCtrl', ->

  # load the controller's module
  beforeEach module 'craftAppApp'
  AgentCtrl = undefined
  scope = undefined

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    AgentCtrl = $controller 'AgentCtrl',
      $scope: scope

  it 'should ...', ->
    expect(1).toEqual 1
