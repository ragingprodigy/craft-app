'use strict'

angular.module 'craftAppApp'
.controller 'LoginCtrl', ($scope, $auth, $window, toastr, $craftAuth, $rootScope) ->
  $scope.login = ->
    $scope.formError = null
    $scope.submitting = true

    $auth.login
      username: $scope.username
      password: $scope.password
    .then (r) ->
      console.log r
      
    #   Auth.me (user) ->
    #     $rootScope.$user = user
    #     toastr.success 'Login Successful!'
    #     $window.location.href = '/dashboard/'
    , (e) ->
      $scope.submitting = false
      toastr.error e.data.message
      $scope.formError = e.data.message