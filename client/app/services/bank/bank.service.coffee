'use strict'

angular.module 'craftAppApp'
.service '$bank', ($resource) ->
  $resource "/api/meta/banks/:id", null,
    update: method: "PUT"