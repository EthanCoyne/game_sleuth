var app = angular.module('sleuthApp', ['ngRoute']);

//pages routes
app.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/login', {
    templateUrl: '/views/login.html',
     controller: 'sleuthController as sleuth'
  }).when('/tagSurvey', {
    templateUrl: '/views/tagSurvey.html',
     controller: 'tagController as tagCtrl'
  }).when('/watchlist', {
    templateUrl: 'views/watchlist.html',
    controller: 'sleuthController as sleuth'
  }).when('/suggestions', {
    templateUrl: 'views/suggestions.html',
    controller: 'sleuthController as sleuth'
  }).when('/gamePage', {
    templateUrl: 'views/gamePage.html',
    controller: 'sleuthController as sleuth'
  })
    $locationProvider.html5Mode(true);
}); // end app.config
