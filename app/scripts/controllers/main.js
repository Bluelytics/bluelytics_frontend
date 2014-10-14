'use strict';

/**
 * @ngdoc function
 * @name bluelyticsFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bluelyticsFrontendApp
 */
angular.module('bluelyticsFrontendApp')
  .controller('MainCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
  	if ($routeParams.dolar_name){
  		$scope.dolar_activo = $routeParams.dolar_name;
  	}else{
  		$scope.dolar_activo = 'blue';
  	}

    $scope.dolares = [
    {
    	'name': 'oficial',
    	'long_name': 'Oficial',
    	'compra': 7,
    	'venta': 8
    },{
    	'name': 'oficial_20',
    	'long_name': 'Ahorro',
    	'compra': 8.4,
    	'venta': 9.6
    },{
    	'name': 'oficial_35',
    	'long_name': 'Tarjeta',
    	'compra': 10,
    	'venta': 11
    },{
    	'name': 'ambito',
    	'long_name': 'Ambito financiero',
    	'compra': 12,
    	'venta': 13
    },{
    	'name': 'lanacion',
    	'long_name': 'La Nacion',
    	'compra': 13,
    	'venta': 14
    },{
    	'name': 'dolarbluenet',
    	'long_name': 'DolarBlue.Net',
    	'compra': 12,
    	'venta': 14
    },{
    	'name': 'blue',
    	'long_name': 'Bluelytics',
    	'compra': 12,
    	'venta': 14
    },];

  }]);
