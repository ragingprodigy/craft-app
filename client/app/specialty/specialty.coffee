'use strict'

angular.module 'craftAppApp'
.config ($stateProvider) ->
  $stateProvider.state 'specialty',
    url: '/meta/specialties'
    templateUrl: 'app/specialty/specialty.html'
    controller: 'SpecialtyCtrl'
