'use strict'

angular.module 'craftAppApp'
.config ($stateProvider) ->
  $stateProvider.state 'dashboard',
    url: '/dashboard/'
    templateUrl: 'app/dashboard/dashboard.html'
    controller: 'DashboardCtrl'
