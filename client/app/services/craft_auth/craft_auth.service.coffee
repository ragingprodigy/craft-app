'use strict'

angular.module 'craftAppApp'
.service '$craftAuth', ( $resource ) ->
  # AngularJS will instantiate a singleton by calling 'new' on this function
  $resource '/auth/:id', null,
    update: method:'PUT'
    me:
      method: 'GET'
      url: '/auth/me'