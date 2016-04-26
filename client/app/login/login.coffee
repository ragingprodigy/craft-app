'use strict'

angular.module 'craftAppApp'
.config ($stateProvider) ->
  $stateProvider.state 'login',
    url: '/'
    guestView: true
    templateUrl: 'app/login/login.html'
    controller: 'LoginCtrl'
