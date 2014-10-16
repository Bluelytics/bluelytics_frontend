'use strict';

/**
 * @ngdoc function
 * @name bluelyticsFrontendApp.controller:WordcloudCtrl
 * @description
 * # WordcloudCtrl
 * Controller of the bluelyticsFrontendApp
 */
angular.module('bluelyticsFrontendApp')
  .controller('WordcloudCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
