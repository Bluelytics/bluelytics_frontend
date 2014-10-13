'use strict';

/**
 * @ngdoc function
 * @name bluelyticsFrontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bluelyticsFrontendApp
 */
angular.module('bluelyticsFrontendApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
