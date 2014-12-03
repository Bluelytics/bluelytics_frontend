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
    'n3-line-chart',
    'underscore',
    'ui.bootstrap-slider',
    'mgcrea.ngStrap',
    'angulartics',
    'angulartics.google.analytics',
    'pascalprecht.translate'
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
  })

  .config(function($tooltipProvider) {
    angular.extend($tooltipProvider.defaults, {
      html: true
    });
  })

  .config(['$translateProvider', function($translateProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix: 'locale/',
        suffix: '.json'
    })
    .registerAvailableLanguageKeys(['es_AR', 'en_US'], {'en_*': 'en_US', 'es_*': 'es_AR', 'en': 'en_US', 'es': 'es_AR'})
    .determinePreferredLanguage()
    .useLocalStorage()
    .fallbackLanguage(['es_AR', 'en_US']);
  }])
;
