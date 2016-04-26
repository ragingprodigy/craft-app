'use strict'

angular.module 'craftAppApp'
.controller 'LoginCtrl', ($scope, $auth, $window, toastr, $craftAuth, $rootScope, $state) ->
  $scope.login = ->
    $scope.formError = null
    $scope.submitting = true

    $auth.login
      username: $scope.username
      password: $scope.password
    .then (r) ->
      $rootScope.$user = r.data.user

      toastr.success 'Login Successful!'
      $state.go "dashboard"
    , (e) ->
      $scope.submitting = false
      toastr.error e.data.message
      $scope.formError = e.data.message