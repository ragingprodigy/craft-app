'use strict'

angular.module 'craftAppApp'
.config ($stateProvider) ->
  $stateProvider.state 'bank',
    url: '/meta/banks/'
    isAdminView: true
    templateUrl: 'app/bank/bank.html'
    controller: 'BankCtrl'
