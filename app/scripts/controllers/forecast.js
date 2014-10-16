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

      var historySeries = _.map(value.history, function(d){
          return [d.date, d.value];
        });

      var forecastSeries = [historySeries[historySeries.length-1]].concat(_.map(value.forecast, function(d){
          return [d.date, d.value];
        }));

      $scope.chartData = [
        {'values': historySeries, 'key': 'Historico'},
        {'values': forecastSeries, 'key': 'Prediccion'},
        ]
    });
  });
