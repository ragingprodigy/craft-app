'use strict'

angular.module 'craftAppApp'
.controller 'DashboardCtrl', ( $scope, $artisan ) ->

  # Fetch all banks
  $scope.artisans = $artisan.query()