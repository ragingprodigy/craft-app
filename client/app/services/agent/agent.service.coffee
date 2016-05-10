'use strict'

angular.module 'craftAppApp'
.service '$agent', ( $resource ) ->
  $resource "/api/reps/:id", null,
    update: method: "PUT"
    createAccount:
      method: 'POST'
      url: '/api/reps/createAccount'
    resetPassword:
      method: 'POST'
      url: '/api/reps/reset_password'
    activate:
      method: 'POST'
      url: '/api/reps/activate'
    deactivate:
      method: 'POST'
      url: '/api/reps/deactivate'