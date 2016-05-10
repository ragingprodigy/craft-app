'use strict'

angular.module 'craftAppApp'
.config ($stateProvider) ->
  $stateProvider.state 'agent',
    url: '/agents/'
    templateUrl: 'app/agent/agent.html'
    controller: 'AgentCtrl'
