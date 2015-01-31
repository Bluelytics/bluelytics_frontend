'use strict';

/**
 * @ngdoc function
 * @name bluelyticsFrontendApp.controller:ForecastCtrl
 * @description
 * # ForecastCtrl
 * Controller of the bluelyticsFrontendApp
 */
angular.module('bluelyticsFrontendApp')
  .controller('ForecastCtrl', function ($scope, blueAPI, _, $translate, $rootScope) {


    var dateFormat = d3.time.format('%d/%m/%Y');

    $scope.tickX = function(d){
                        return dateFormat(new Date(d));
                    };
    $scope.tickY = function(d){
                        return d3.format('.02f')(d);
                    };


    blueAPI.forecast_data(function(value){


      $scope.data = value.forecast;

      $scope.options = {
        axes: {
          x: {key: 'date', type: 'date', labelFunction: function(d){return dateFormat(d);}},
          y: {type: 'linear'},
        },
        series: [
          {y: 'low', color: 'lightblue', axis:'y', type: 'line',thickness: '1px', label: 'Valor min'},
          {y: 'value', color: 'steelblue', axis:'y', type: 'line',thickness: '3px', label: 'Valor predicho'},
          {y: 'high', color: 'darkblue', axis:'y',  type: 'line', thickness: '1px', label: 'Valor max'}
        ],
        tooltip: {
          mode: 'scrubber',
          formatter: function (x, y) {
            return dateFormat(x) + ' : ' + y.toFixed(2);
          }
        },
        stacks: [],
        lineMode: 'linear',
        drawLegend: true,
        drawDots: false,
        columnsHGap: 5
      };

      var translateLabels = function(){
        $translate('FORECAST.CHART.MIN').then(function(t){
          $scope.options.series[0].label = t;
        });
        $translate('FORECAST.CHART.AVG').then(function(t){
          $scope.options.series[1].label = t;
        });
        $translate('FORECAST.CHART.MAX').then(function(t){
          $scope.options.series[2].label = t;
        });
      };

      translateLabels();

      $rootScope.$on('$translateChangeSuccess', function () {
        translateLabels();
      });


      $scope.tableData = _.map(value.forecast, function(d){
          d.date_month = dateFormat(new Date(d.date));
          return d;
        });
    });


  });
