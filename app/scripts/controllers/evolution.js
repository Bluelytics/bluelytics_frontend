'use strict';

/**
 * @ngdoc function
 * @name bluelyticsFrontendApp.controller:EvolutionCtrl
 * @description
 * # EvolutionCtrl
 * Controller of the bluelyticsFrontendApp
 */
angular.module('bluelyticsFrontendApp')
  .controller('EvolutionCtrl', function ($scope, blueAPI, $window, $translate, $rootScope) {

    var dateFormat = d3.time.format('%d/%m/%Y');

    $scope.tickX = function(d){
                        return dateFormat(new Date(d));
                    };
    $scope.tickY = function(d){
                        return d3.format('.02f')(d);
                    };


    $scope.filter = {};
    $scope.filter.maxValue = 300;
    $scope.filter.value = [$scope.filter.maxValue - $scope.filter.maxValue/3,$scope.filter.maxValue];

    $scope.filterData = function(){
      var step = $scope.data.length / $scope.filter.maxValue;
      var start = Math.floor($scope.filter.value[0] * step);
      var end = Math.ceil($scope.filter.value[1] * step);
      $scope.filteredData = $scope.data.slice(start,end+1);
    };

    blueAPI.graph_evolution_data(function(data){

      var evData = data;

      if($window.innerWidth < 768 && evData.length > 60){
        evData.splice(0, evData.length - 60);
      }

      $scope.data = evData;
      $scope.filterData();

      $scope.options = {
        axes: {
          x: {key: 'date', type: 'date', labelFunction: function(d){return dateFormat(d);}},
          y: {type: 'linear'},
        },
        series: [
          {y: 'blue', color: 'steelblue', axis:'y', type: 'line',thickness: '1px', label: 'Dolar Blue'},
          {y: 'oficial', color: 'green', axis:'y',  type: 'line', thickness: '1px', label: 'Dolar Oficial'}
        ],
        tooltip: {
          mode: 'scrubber',
          formatter: function (x, y) {
            return dateFormat(x) + ' : ' + y.toFixed(2);
          }
        },
        stacks: [],
        lineMode: 'linear',
        tension: 0.7,
        drawLegend: true,
        drawDots: false,
        columnsHGap: 5
      };


      var translateLabels = function(){
        $translate('COMMON.DOLARES.blue').then(function(t){
          $scope.options.series[0].label = t;
        });
        $translate('COMMON.DOLARES.oficial').then(function(t){
          $scope.options.series[1].label = t;
        });
      };

      translateLabels();

      $rootScope.$on('$translateChangeSuccess', function () {
        translateLabels();
      });

    });

  });
