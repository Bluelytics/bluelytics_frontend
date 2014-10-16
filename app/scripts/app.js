'use strict';

/**
 * @ngdoc overview
 * @name bluelyticsFrontendApp
 * @description
 * # bluelyticsFrontendApp
 *
 * Main module of the application.
 */
angular
  .module('bluelyticsFrontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.select',
    'nvd3',
    'underscore'
  ])
  .config(function ($routeProvider, uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
    
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/dolar/:dolar_name', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/calculator', {
        templateUrl: 'views/calculator.html',
        controller: 'CalculatorCtrl'
      })
      .when('/evolution', {
        templateUrl: 'views/evolution.html',
        controller: 'EvolutionCtrl'
      })
      .when('/gap', {
        templateUrl: 'views/gap.html',
        controller: 'GapCtrl'
      })
      .when('/wordcloud', {
        templateUrl: 'views/wordcloud.html',
        controller: 'WordcloudCtrl'
      })
      .when('/forecast', {
        templateUrl: 'views/forecast.html',
        controller: 'ForecastCtrl'
      })
      .when('/api', {
        templateUrl: 'views/api.html',
        controller: 'ApiCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
