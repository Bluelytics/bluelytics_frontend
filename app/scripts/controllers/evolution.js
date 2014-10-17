'use strict';

/**
 * @ngdoc function
 * @name bluelyticsFrontendApp.controller:EvolutionCtrl
 * @description
 * # EvolutionCtrl
 * Controller of the bluelyticsFrontendApp
 */
angular.module('bluelyticsFrontendApp')
  .controller('EvolutionCtrl', function ($scope, blueAPI) {

    var dateFormat = d3.time.format("%d/%m/%Y");

    $scope.tickX = function(d){
                        return dateFormat(new Date(d));
                    };
    $scope.tickY = function(d){
                        return d3.format('.02f')(d);
                    };

    blueAPI.graph_evolution_data(function(data){

      $scope.data = data;
      console.log($scope.data);
    });

  });
