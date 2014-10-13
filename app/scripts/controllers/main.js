'use strict';

/**
 * @ngdoc function
 * @name bluelyticsFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bluelyticsFrontendApp
 */
angular.module('bluelyticsFrontendApp')
  .controller('MainCtrl', function ($scope) {
    $scope.todos = [
      'aaa',
      'bbb',
      'ccc'
    ];
  });
