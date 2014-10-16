'use strict';

/**
 * @ngdoc function
 * @name bluelyticsFrontendApp.controller:EvolutionCtrl
 * @description
 * # EvolutionCtrl
 * Controller of the bluelyticsFrontendApp
 */
angular.module('bluelyticsFrontendApp')
  .controller('EvolutionCtrl', function ($scope, _, blueAPI) {

    var dateFormat = d3.time.format("%d/%m/%Y");
    $scope.options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Día',
                    tickFormat: function(d){
                        return dateFormat(new Date(d));
                    },
                },
                yAxis: {
                    axisLabel: 'Precio del dolar (en ARS)',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: 30
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            },
            title: {
                enable: true,
                text: 'Evolución'
            },
            subtitle: {
                enable: true,
                text: 'El grafico presentado a continuacion es un resumen diario del valor promedio del Dólar Blue.',
                css: {
                    'text-align': 'center',
                    'margin': '10px 13px 0px 7px'
                }
            }
        };

        blueAPI.graph_data.query().$promise.then(function(rawData){

          var transformData = function transformData(v){
            return {x: new Date(v.date), y: v.value};
          };

          $scope.data = [];

          for(var key in rawData){
              if(rawData.hasOwnProperty(key) && key != '$promise' && key != '$resolved'){
                $scope.data.push({
                  'values': _.map(rawData[key], transformData),
                  'key': key
                });
              }
            }

        });

  });
