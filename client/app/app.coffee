'use strict'

angular.module 'craftAppApp', [
  'ngCookies'
  'ngResource'
  'ngSanitize'
  'ui.router'
  'ui.bootstrap'
  'ngStorage'
  'toastr'
  'satellizer'
  'naif.base64'
  'ui.utils.masks'
  'angular-loading-bar'
  'cloudinary'
]
  
.run ($auth, $rootScope, $window) ->
  $rootScope.cl = cloudinary.Cloudinary.new()
  $rootScope.cl.fromEnvironment()

  $rootScope.$auth = $auth
  $rootScope.$user = $auth.getPayload()

  $rootScope.formatMoney = (m) ->
    parseInt(m).formatMoney 2

  $rootScope.ago = (dt) ->
    moment(dt).fromNow()

  $rootScope.$on '$stateChangeStart', (event, next) ->
    if not $auth.isAuthenticated() and not next.guestView then $window.location.href = '/'

.config ( $stateProvider, $urlRouterProvider, $locationProvider, $authProvider, $httpProvider, cloudinaryProvider ) ->
  $httpProvider.interceptors.push("$requestInterceptor")

  cloudinaryProvider.set "cloud_name", "softcom"
  cloudinaryProvider.set "upload_preset", "craft-app"

  $authProvider.logoutRedirect = '/'
  $authProvider.loginOnSignup = false
  $authProvider.signupRedirect = false
  $authProvider.loginUrl = '/auth/login'
  $authProvider.signupUrl = '/auth/create'
  $authProvider.loginRoute = '/login/'

  $authProvider.tokenPrefix = '__craft_auth__'

  $authProvider.platform = 'browser'
  $authProvider.storage = 'sessionStorage'

  $urlRouterProvider
  .otherwise '/'

  $locationProvider.html5Mode true
