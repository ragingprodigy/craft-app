'use strict'

angular.module 'craftAppApp'
.service '$artisan', ( $resource ) ->
  $resource "/api/artisans/:id", null,
    update: method: "PUT"