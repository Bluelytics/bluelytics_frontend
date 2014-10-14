'use strict';

/**
 * @ngdoc function
 * @name bluelyticsFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bluelyticsFrontendApp
 */
angular.module('bluelyticsFrontendApp')
  .controller('MainCtrl', ['$scope', '$routeParams', 'valorBlue', function ($scope, $routeParams, valorBlue) {
  	if ($routeParams.dolar_name){
  		$scope.dolar_activo = $routeParams.dolar_name;
  	}else{
  		$scope.dolar_activo = 'blue';
  	}

    $scope.dolares = valorBlue();

  }]);
