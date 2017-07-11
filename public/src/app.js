angular.module('app', ['ui.router'])

  .config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider
      .otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: './src/views/splash/splash.html'
      })
      .state('trend', {
        templateUrl: './src/views/trend/trend.html'
      })
      .state('endorse', {
        templateUrl: './views/endorse.html'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: './src/views/signup/signup.html',
        controller: 'signupCtrl'
      })
      .state('summary', {
        url: '/summary',
        templateUrl: './src/views/summary/summary.html'
      })
      .state('sales', {
        url: '/sales',
        templateUrl: './src/views/sales/sales.html'
      })
  })
