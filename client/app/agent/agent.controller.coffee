'use strict'

angular.module 'craftAppApp'
.controller 'AgentCtrl', ( $scope, $agent, toastr, $craftAuth ) ->
  _selectedIndex = null
  $scope.agents = $agent.query()

  # Edit Button Event Handler
  $scope.editAgent = (index) ->
    _selectedIndex = index
    $scope.showNewForm()
    $scope.agent = angular.copy $scope.agents[index]

  # Show Form and initialize Form Model
  $scope.showNewForm = ->
    $scope.editing = true
    $scope.agent = {}

  # Reset Form Model and Hide Form
  resetAndCancel = (theForm) ->
    theForm.$setPristine()
    theForm.$setUntouched()
    $scope.agent = {}
    $scope.editing = false

  # Scope shadow method
  $scope.resetAndCancel = (form) ->
    resetAndCancel(form)

  # Save or Update Agent details
  $scope.submit = (theForm) ->
    if theForm.$valid
      if $scope.agent._id?
        # update agent details
        $agent.update id: $scope.agent._id, $scope.agent, (b) ->
          $scope.agents[_selectedIndex] = b
          resetAndCancel(theForm)
        , handleError
      else
        # create new agent
        agent = new $agent $scope.agent
        agent.$save (saved) ->
          # Add to list of agents
          $scope.agents.push saved
          resetAndCancel(theForm)
        , handleError
    else toastr.error "Please fill the form before submitting"

  # Create User account for the selected agent
  $scope.createAccount = (index) ->
    agent = $scope.agents[index]
    if not agent.user?
      username = prompt "Please provide a username for this account", agent.name.split(" ").join("").toLowerCase().substr 0, 8
      if username.trim().length > 0
        $agent.createAccount
          _id: agent._id
          username: username
        , (user) ->
          $scope.agents[index].user = user
          toastr.success "User account created with default password", "Success!"
        , (e) ->
          toastr.error e.data.message, "Error"
      else toastr.info "Cannot create an account without a username"
    else toastr.info 'User account already created before'

  # Reset account password to default
  $scope.resetPassword = (index) ->
    agent = $scope.agents[index]
    if agent.user?
      if confirm "Are you sure? Account password would be reset. This action is irreversible."
        $craftAuth.resetPassword id: agent.user._id, (response) ->
          toastr.info response.message
        , (e) ->
          toastr.error e.data.message
    else toastr.info "You cannot reset password for an Agent without an account"
      
  # Activate Agent
  $scope.activateAgent = (index) ->
    agent = $scope.agents[index]
    if not agent.active
      $agent.activate id: agent._id, (response) ->
        $scope.agents[index].active = response.status
      , (e) ->
        toastr.error e.data.message

  # Deactivate Agent
  $scope.deactivateAgent = (index) ->
    agent = $scope.agents[index]
    if agent.active and confirm "Are you sure?"
      $agent.deactivate id: agent._id, (response) ->
        $scope.agents[index].active = response.status
      , (e) ->
        toastr.error e.data.message

  # Handle HTTP Errors
  handleError = (err) ->
    # Show Error message
    if err.data.message? then toastr.error err.data.message