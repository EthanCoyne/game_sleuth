var app = angular.module('sleuthApp', ['ngRoute', 'ui.bootstrap', 'angular-loading-bar']);

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
    controller: 'watchlistController as watchCtrl'
  }).when('/suggestions', {
    templateUrl: 'views/suggestions.html',
    controller: 'suggestionsController as sugCtrl'
  }).when('/gamePage', {
    templateUrl: 'views/gamePage.html',
    controller: 'gameController as gameCtrl'
  }).when('/searchHistory', {
    templateUrl: 'views/searchHistory.html',
    controller: 'historyController as histCtrl'
  })
    $locationProvider.html5Mode(true);
}); // end app.config
