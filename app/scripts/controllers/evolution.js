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

      if($window.innerWidth < 768 && evData.length > 60){
        evData.splice(0, evData.length - 60);
      }

      $scope.data = evData;

      $scope.options = {
        axes: {
          x: {key: 'date', type: 'date', labelFunction: function(d){return dateFormat(d);}},
          y: {type: 'linear'},
        },
        series: [
          {y: 'blue', color: 'steelblue', axis:"y", type: 'line',thickness: "1px", label: 'Dolar Blue'},
          {y: 'oficial', color: 'green', axis:"y",  type: 'line', thickness: "1px", label: 'Dolar Oficial'}
        ],
        tooltip: {
          mode: "scrubber",
          formatter: function (x, y, series) {
            return dateFormat(x) + ' : ' + y.toFixed(2);
          }
        },
        stacks: [],
        lineMode: "linear",
        drawLegend: true,
        drawDots: false,
        columnsHGap: 5
      }

    });

  });
