angular.module('app', ['ui.router'])

  .config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider
      .otherwise('/');

    $stateProvider
      .state('splash', {
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
        templateUrl: './src/views/summary/summary.html',
        controller: 'summaryCtrl'

      })
      .state('sales', {
        url: '/sales',
        templateUrl: './src/views/sales/sales.html',
        controller: 'salesCtrl'
      })
      .state('portfolio', {
        url: '/portfolio',
        templateUrl: './src/views/portfolio/portfolio.html',
        controller: 'portfolioCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: './src/views/login/login.html'
      })
      .state('map', {
        url: '/map',
        templateUrl: './src/views/map/map.html',
        controller: 'mapCtrl'
      })



  })
