'use strict'

angular.module 'craftAppApp'
.config ($stateProvider) ->
  $stateProvider.state 'agent',
    url: '/agents/'
    isAdminView: true
    templateUrl: 'app/agent/agent.html'
    controller: 'AgentCtrl'
