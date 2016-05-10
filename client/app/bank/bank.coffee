'use strict'

angular.module 'craftAppApp'
.config ($stateProvider) ->
  $stateProvider.state 'bank',
    url: '/meta/banks/'
    templateUrl: 'app/bank/bank.html'
    controller: 'BankCtrl'
