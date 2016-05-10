'use strict'

angular.module 'craftAppApp'
.controller 'NavbarCtrl', ($scope, $location, $auth, $rootScope, $state) ->
  $scope.logout = ->
    if confirm 'Are you sure?'
      $auth.logout()
      $state.go 'login'

  $scope.isGuest = ->
    !$auth.isAuthenticated()

  $scope.isRep = ->
    $rootScope.$user.role is 'rep'

  $scope.isCollapsed = true

  $scope.isActive = (route) ->
    $location.path().indexOf route is 0