'use strict';

/**
 * @ngdoc function
 * @name bluelyticsFrontendApp.controller:GapCtrl
 * @description
 * # GapCtrl
 * Controller of the bluelyticsFrontendApp
 */
angular.module('bluelyticsFrontendApp')
  .controller('GapCtrl', function ($scope, blueAPI, $window) {

    /* Gap calculator */

    $scope.valorCompare = 1;

    $scope.valorDolarBlue = 0;
    $scope.valorDolarOficial = 0;
    $scope.valorDolarAhorro = 0;
    $scope.valorDolarTarjeta = 0;

    $scope.gap = function gap(ofi, blue){
        return blue - ofi;
    }

    $scope.percGap = function percGap(ofi, blue){
        return (blue - ofi) / ofi;
    }

    /* Graph */

    $scope.dateFormat = d3.time.format("%d/%m/%Y");
    $scope.percFormat = d3.format('.02%');

    $scope.tickX = function(d){
                        return $scope.dateFormat(new Date(d));
                    };
    $scope.tickY = function(d){
                        return $scope.percFormat(d);
                    };

    /* Requests */

    blueAPI.extended_last_price(function(dolares){
                
        for(var i = 0; i < dolares.length; i++){
            var dolar = dolares[i];
            switch(dolar.name){
                case 'oficial':
                    $scope.valorDolarOficial = dolar.avg;
                    break;
                case 'oficial_20':
                    $scope.valorDolarAhorro = dolar.avg;
                    break;
                case 'oficial_35':
                    $scope.valorDolarTarjeta = dolar.avg;
                    break;
                case 'blue':
                    $scope.valorDolarBlue = dolar.avg;
                    break;
            }
        }
    });

    blueAPI.graph_gap_data(function(data){

      var evData = data;

      for(var i = 0; i < evData.length; i++){
        if($window.innerWidth < 768 && evData[i].values.length > 60){
          evData[i].values.splice(0, evData[i].values.length - 60);
        }
      }
      
      $scope.data = evData;
    

    });

  });
