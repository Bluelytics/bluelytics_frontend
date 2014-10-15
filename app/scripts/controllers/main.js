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
    
    valorBlue.query({}, function(value, headers){
        var newDolares = [];

        for(var i = 0; i < value.length;i++){
            var dolar = value[i];
            dolar.compra_dif = dolar.compra - dolar.compra_ayer;
            dolar.venta_dif = dolar.venta - dolar.venta_ayer;
            dolar.avg = (dolar.compra + dolar.venta) / 2;
            dolar.avg_ayer = (dolar.compra_ayer + dolar.venta_ayer) / 2;
            dolar.avg_dif = dolar.avg - dolar.avg_ayer;
            newDolares.push(dolar);
        }
        $scope.dolares = newDolares;
    });
    
    if ($routeParams.dolar_name){
  		$scope.dolar_activo = $routeParams.dolar_name;
  	}else{
  		$scope.dolar_activo = 'blue';
  	}


  }]);
