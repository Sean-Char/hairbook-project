angular.module('app', ['ui.router'])

  .config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider
      .otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'mapCtrl',
        templateUrl: '../views/home.html'
      })
      .state('trend', {
        templateUrl: '../views/trend.html'
      })
      .state('endorse', {
        templateUrl: '../views/endorse.html'
      })
  })
