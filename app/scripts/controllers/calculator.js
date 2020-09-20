'use strict';

/**
 * @ngdoc function
 * @name bluelyticsFrontendApp.controller:CalculatorCtrl
 * @description
 * # CalculatorCtrl
 * Controller of the bluelyticsFrontendApp
 */
angular.module('bluelyticsFrontendApp')
  .controller('CalculatorCtrl', function ($scope, $filter, blueAPI) {
    $scope.loading = true;

    $scope.moneda = {};
    $scope.calculo = {
      ars: 0,
      ext: 0
    };

    $scope.update_ars = function update_ars(){
        if($scope.valor_dolar && $scope.moneda.selected){
            $scope.calculo.ars =  parseFloat( (($scope.calculo.ext / $scope.moneda.selected.value) * $scope.valor_dolar).toFixed(2));
        }
    };

    $scope.update_ext = function update_ext(){
        if($scope.valor_dolar && $scope.moneda.selected){
            $scope.calculo.ext =  parseFloat( (($scope.calculo.ars / $scope.valor_dolar) * $scope.moneda.selected.value).toFixed(2));
        }
    };

    blueAPI.extended_last_price(function(value){
        $scope.dolares = value;
        $scope.cambiarDolar('blue');
    });

    $scope.dolares_keys = ['blue', 'oficial']


    $scope.monedas = blueAPI.all_currencies.query({}, function(){
      $scope.loading = false;
        for(var i = 0; i < $scope.monedas.length; i++){
            if($scope.monedas[i].code === 'USD'){
                $scope.moneda.selected = $scope.monedas[i];
            }

        }
    });


    $scope.cambiarDolar = function cambiarDolar(newVal){
        $scope.dolar_activo = $scope.dolares[newVal];
        $scope.valor_dolar = $scope.dolar_activo.value_avg;
        $scope.update_ext();
    };


  });
