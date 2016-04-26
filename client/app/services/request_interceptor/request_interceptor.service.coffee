'use strict'

angular.module 'craftAppApp'
.service '$requestInterceptor', ( $q, $uiBlock ) ->
  #This will be called on every outgoing http request
  request: (config)->
    if config.url.match(new RegExp('api/')) or config.url.match(new RegExp('auth/login')) then $uiBlock.block 'html'

    if config.url.match(new RegExp('cloudinary'))
      config.headers.Authorization = undefined

    config || $q.when(config)

  requestError: (rejectReason) ->
    #Unblock the UI
    $uiBlock.clear()
    rejectReason

  response: (response) ->
    #Unblock the UI
    $uiBlock.clear()
    response

  # This will be called on every incoming response that has en error status code
  responseError: (response) ->
    #Unblock the UI
    $uiBlock.clear()

    $q.reject(response)