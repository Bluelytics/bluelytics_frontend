'use strict';

/**
 * @ngdoc function
 * @name bluelyticsFrontendApp.controller:GapCtrl
 * @description
 * # GapCtrl
 * Controller of the bluelyticsFrontendApp
 */
angular.module('bluelyticsFrontendApp')
  .controller('GapCtrl', function ($scope, blueAPI, $window, $translate, $rootScope) {
    $scope.loading = true;
    var dateFormat = d3.time.format('%d/%m/%Y');
    /* Gap calculator */

    $scope.valorCompare = 200;

    $scope.valorDolarBlue = 0;
    $scope.valorDolarOficial = 0;

    $scope.gap = function gap(ofi, blue){
        return blue - ofi;
    };

    $scope.percGap = function percGap(ofi, blue){
        return (blue - ofi) / ofi;
    };

    /* Graph */

    $scope.dateFormat = d3.time.format('%d/%m/%Y');
    $scope.percFormat = d3.format('.02%');

    $scope.tickX = function(d){
                        return $scope.dateFormat(new Date(d));
                    };
    $scope.tickY = function(d){
                        return $scope.percFormat(d);
                    };

    /* Range filter */

    $scope.filter = {};
    $scope.filter.maxValue = 300;
    $scope.filter.value = [$scope.filter.maxValue - $scope.filter.maxValue/3,$scope.filter.maxValue];

    $scope.filterData = function(){
      var step = $scope.data.length / $scope.filter.maxValue;
      var start = Math.floor($scope.filter.value[0] * step);
      var end = Math.ceil($scope.filter.value[1] * step);
      $scope.filteredData = $scope.data.slice(start,end+1);
    };

    /* Requests */

    blueAPI.extended_last_price(function(dolares){
      $scope.loading = false;
      $scope.valorDolarOficial = dolares.oficial.value_avg;
      $scope.valorDolarBlue = dolares.blue.value_avg;
    });

    blueAPI.graph_gap_data(function(data){

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
          {y: 'brecha', color: 'red', axis:'y', type: 'line',thickness: '1px', label: 'Brecha'}
        ],
        tooltip: {
          mode: 'scrubber',
          formatter: function (x, y) {
            return dateFormat(x) + ' : ' + $scope.percFormat(y/100);
          }
        },
        stacks: [],
        lineMode: 'linear',
        drawLegend: true,
        drawDots: false,
        columnsHGap: 5
      };


      var translateLabels = function(){
        $translate('GAP.GAP').then(function(t){
          $scope.options.series[0].label = t;
        });
      };

      translateLabels();

      $rootScope.$on('$translateChangeSuccess', function () {
        translateLabels();
      });

    });

  });
