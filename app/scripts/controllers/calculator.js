'use strict';

/**
 * @ngdoc function
 * @name bluelyticsFrontendApp.controller:CalculatorCtrl
 * @description
 * # CalculatorCtrl
 * Controller of the bluelyticsFrontendApp
 */
angular.module('bluelyticsFrontendApp')
  .controller('CalculatorCtrl', ['$scope', '$filter', 'blueAPI', function ($scope, $filter, blueAPI) {

    $scope.moneda = {};
    $scope.calculo_ars = 0;
    $scope.calculo_ext = 0;

    $scope.update_ars = function update_ars(){
        if($scope.valor_dolar && $scope.moneda.selected){
            $scope.calculo_ars =  ($scope.calculo_ext / $scope.moneda.selected.value) * $scope.valor_dolar;
        }
    }

    $scope.update_ext = function update_ext(){
        if($scope.valor_dolar && $scope.moneda.selected){
            $scope.calculo_ext =  ($scope.calculo_ars / $scope.valor_dolar) * $scope.moneda.selected.value;
        }
    }

    blueAPI.extended_last_price(function(value){
        $scope.dolares = $filter('filter')(value, function(dolar){
            return (dolar.name === 'oficial' || dolar.name === 'blue' || dolar.name === 'oficial_20' || dolar.name === 'oficial_35');
        }, true);
        $scope.cambiarDolar('blue');
    });


    $scope.monedas = blueAPI.all_currencies.query({}, function(){
        for(var i = 0; i < $scope.monedas.length; i++){
            if($scope.monedas[i].code === 'USD'){
                $scope.moneda.selected = $scope.monedas[i];
            }
            
        }
    });
    

    $scope.cambiarDolar = function cambiarDolar(newVal){
        for(var i = 0; i < $scope.dolares.length; i++){
            var dolar = $scope.dolares[i];
            if(dolar.name === newVal){
                $scope.dolar_activo = newVal;
                $scope.valor_dolar = dolar.avg;
                $scope.update_ext();
            }
        }
    }


  }]);
