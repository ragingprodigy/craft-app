'use strict'

angular.module 'craftAppApp'
.controller 'SpecialtyCtrl', ( $scope, $specialty, toastr ) ->
  _selectedIndex = null
  $scope.specialties = $specialty.query()

  # Edit Button Event Handler
  $scope.editSpecialty = (index) ->
    _selectedIndex = index
    $scope.showNewForm()
    $scope.specialty = angular.copy $scope.specialties[index]

  # Show Form and initialize Form Model
  $scope.showNewForm = ->
    $scope.editing = true
    $scope.specialty = {}

  # Reset Form Model and Hide Form
  resetAndCancel = (theForm) ->
    theForm.$setPristine()
    theForm.$setUntouched()
    $scope.specialty = {}
    $scope.editing = false

  # Scope shadow method
  $scope.resetAndCancel = (form) ->
    resetAndCancel(form)

  # Save or Update Specialty details
  $scope.submit = (theForm) ->
    if theForm.$valid
      if $scope.specialty._id?
        # update specialty details
        $specialty.update id: $scope.specialty._id, $scope.specialty, (b) ->
          $scope.specialties[_selectedIndex] = b
          resetAndCancel(theForm)
        , handleError
      else
        # create new specialty
        specialty = new $specialty $scope.specialty
        specialty.$save (saved) ->
          # Add to list of specialties
          $scope.specialties.push saved
          resetAndCancel(theForm)
        , handleError
    else toastr.error "Please fill the form before submitting"

  # Handle HTTP Errors
  handleError = (err) ->
    # Show Error message
    if err.data.message? then toastr.error err.data.message