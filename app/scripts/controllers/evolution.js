'use strict';

/**
 * @ngdoc function
 * @name bluelyticsFrontendApp.controller:EvolutionCtrl
 * @description
 * # EvolutionCtrl
 * Controller of the bluelyticsFrontendApp
 */
angular.module('bluelyticsFrontendApp')
  .controller('EvolutionCtrl', function ($scope, blueAPI, $window) {

    var dateFormat = d3.time.format("%d/%m/%Y");

    $scope.tickX = function(d){
                        return dateFormat(new Date(d));
                    };
    $scope.tickY = function(d){
                        return d3.format('.02f')(d);
                    };

    blueAPI.graph_evolution_data(function(data){

      var evData = data;

      for(var i = 0; i < evData.length; i++){
        if($window.innerWidth < 768 && evData[i].values.length > 60){
          evData[i].values.splice(0, evData[i].values.length - 60);
        }
      }
      
      $scope.data = evData;
    });

  });
