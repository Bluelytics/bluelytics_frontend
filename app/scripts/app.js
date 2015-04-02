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
    'ngSanitize',
    'ngTouch',
    'ui.select',
    'n3-line-chart',
    'underscore',
    'ui.bootstrap-slider',
    'mgcrea.ngStrap',
    'angulartics',
    'angulartics.google.analytics',
    'pascalprecht.translate',
    'ngMaterial',
    'ui.router'
  ])

  .config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('rates', {
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    })
    .state('calculator', {
      url: '/calculator',
      templateUrl: 'views/calculator.html',
      controller: 'CalculatorCtrl'
    })
    .state('evolution', {
      url: '/evolution',
      templateUrl: 'views/evolution.html',
      controller: 'EvolutionCtrl'
    })
    .state('gap', {
      url: '/gap',
      templateUrl: 'views/gap.html',
      controller: 'GapCtrl'
    })
    .state('wordcloud', {
      url: '/wordcloud',
      templateUrl: 'views/wordcloud.html',
      controller: 'WordcloudCtrl'
    })
    .state('forecast', {
      url: '/forecast',
      templateUrl: 'views/forecast.html',
      controller: 'ForecastCtrl'
    })
    .state('api', {
      url: '/api',
      templateUrl: 'views/api.html',
      controller: 'ApiCtrl'
    })
    .state('analysis', {
      url: '/analysis',
      templateUrl: 'views/analysis.html',
      controller: 'AnalysisCtrl'
    })

    ;
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

  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('light-blue')
      .accentPalette('amber');
  })
  .config(['$mdIconProvider', function($mdIconProvider) {
            $mdIconProvider
                .iconSet('action', '../images/material-design/action-icons.svg', 24)
                .iconSet('alert', '../images/material-design/alert-icons.svg', 24)
                .iconSet('av', '../images/material-design/av-icons.svg', 24)
                .iconSet('communication', '../images/material-design/communication-icons.svg', 24)
                .iconSet('content', '../images/material-design/content-icons.svg', 24)
                .iconSet('device', '../images/material-design/device-icons.svg', 24)
                .iconSet('editor', '../images/material-design/editor-icons.svg', 24)
                .iconSet('file', '../images/material-design/file-icons.svg', 24)
                .iconSet('hardware', '../images/material-design/hardware-icons.svg', 24)
                .iconSet('icons', '../images/material-design/icons-icons.svg', 24)
                .iconSet('image', '../images/material-design/image-icons.svg', 24)
                .iconSet('maps', '../images/material-design/maps-icons.svg', 24)
                .iconSet('navigation', '../images/material-design/navigation-icons.svg', 24)
                .iconSet('notification', '../images/material-design/notification-icons.svg', 24)
                .iconSet('social', '../images/material-design/social-icons.svg', 24)
                .iconSet('toggle', '../images/material-design/toggle-icons.svg', 24)
        }])
;
