'use strict'

angular.module 'craftAppApp'
.service '$specialty', ($resource) ->
  $resource "/api/meta/specialties/:id", null,
    update: method: "PUT"