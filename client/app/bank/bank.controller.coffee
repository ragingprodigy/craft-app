'use strict'

angular.module 'craftAppApp'
.controller 'BankCtrl', ( $scope, $bank, toastr ) ->
  _selectedIndex = null
  
  # Fetch all banks
  $scope.banks = $bank.query()

  # Edit Button Event Handler
  $scope.editBank = (index) ->
    _selectedIndex = index
    $scope.showNewForm()
    $scope.bank = angular.copy $scope.banks[index]
  
  # Show Form and initialize Form Model
  $scope.showNewForm = ->
    $scope.editing = true
    $scope.bank = {}

  # Reset Form Model and Hide Form
  resetAndCancel = (theForm) ->
    theForm.$setPristine()
    theForm.$setUntouched()
    $scope.bank = {}
    $scope.editing = false
    
  # Scope shadow method
  $scope.resetAndCancel = (form) ->
    resetAndCancel(form)
    
  # Save or Update Bank details
  $scope.submit = (theForm) ->
    if theForm.$valid
      if $scope.bank._id?
        # update bank details
        $bank.update id: $scope.bank._id, $scope.bank, (b) ->
          $scope.banks[_selectedIndex] = b
          resetAndCancel(theForm)
        , handleError
      else 
        # create new bank
        bank = new $bank $scope.bank
        bank.$save (saved) ->
          # Add to list of banks
          $scope.banks.push saved
          resetAndCancel(theForm)
        , handleError
    else toastr.error "Please fill the form before submitting"
      
  # Handle HTTP Errors
  handleError = (err) ->
    # Show Error message
    if err.data.message? then toastr.error err.data.message