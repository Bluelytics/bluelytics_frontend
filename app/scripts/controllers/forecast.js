'use strict';

/**
 * @ngdoc function
 * @name bluelyticsFrontendApp.controller:ForecastCtrl
 * @description
 * # ForecastCtrl
 * Controller of the bluelyticsFrontendApp
 */
angular.module('bluelyticsFrontendApp')
  .controller('ForecastCtrl', function ($scope, blueAPI, _) {


    var monthFormat = d3.time.format("%m/%Y");

    $scope.tickX = function(d){
                        return monthFormat(new Date(d));
                    };
    $scope.tickY = function(d){
                        return d3.format('.02f')(d);
                    };


    blueAPI.forecast_data(function(value){

      $scope.chartData = [
        {
          'key': 'Predicho minimo',
          'values': _.map(value.forecast, function(d){
                        return [d.date, d.low];
                    })
        },
        {
          'key': 'Predicho promedio',
          'values': _.map(value.forecast, function(d){
                        return [d.date, d.value];
                    })
        },
        {
          'key': 'Predicho maximo',
          'values': _.map(value.forecast, function(d){
                        return [d.date, d.high];
                    })
        }
      ]

      $scope.tableData = _.map(value.forecast, function(d){
          d.date_month = monthFormat(new Date(d.date));
          return d;
        });;
    });


  });
