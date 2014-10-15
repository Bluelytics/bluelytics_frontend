'use strict';

/**
 * @ngdoc function
 * @name bluelyticsFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bluelyticsFrontendApp
 */
angular.module('bluelyticsFrontendApp')
  .controller('MainCtrl', ['$scope', '$routeParams', 'blueAPI', function ($scope, $routeParams, blueAPI) {
    
    blueAPI.extended_last_price(function(value){
        $scope.dolares = value;
    });
    
    if ($routeParams.dolar_name){
  		$scope.dolar_activo = $routeParams.dolar_name;
  	}else{
  		$scope.dolar_activo = 'blue';
  	}


  }]);
