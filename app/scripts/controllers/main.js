'use strict';

/**
 * @ngdoc function
 * @name bluelyticsFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bluelyticsFrontendApp
 */
angular.module('bluelyticsFrontendApp')
  .controller('MainCtrl', function ($scope, $routeParams, $location, blueAPI) {
    
    blueAPI.extended_last_price(function(value){
        $scope.dolares = value;
    });
    
  	$scope.dolar_activo = 'blue';

    $scope.cambiarDolar = function (dolar){
      $scope.dolar_activo = dolar;
    };

    $scope.esOficial = function(dolar){
      if (dolar.name.indexOf('oficial') > -1) {
        return true;
      }else{
        return false;
      }
    }
    $scope.esBlue = function(dolar){
      return !$scope.esOficial(dolar);
    }


  });
