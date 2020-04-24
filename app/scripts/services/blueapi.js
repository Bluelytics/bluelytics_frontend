'use strict';

/**
 * @ngdoc service
 * @name bluelyticsFrontendApp.blueAPI
 * @description
 * # blueAPI
 * Service in the bluelyticsFrontendApp. - API of bluelytics wrapper
 */
angular.module('bluelyticsFrontendApp')
  .service('blueAPI', function blueAPI($resource, $q, _, backendUrl) {
    var graph_evolution_data = null;
    var graph_gap_data = null;

    var dateFormat = d3.time.format.utc('%d/%m/%Y');

    var percGap = function percGap(ofi, blue){
        return (blue - ofi) / ofi;
    };

    var last_price_resource = $resource( backendUrl + 'api/last_price', {}, {
      query: {method:'GET', isArray:true, cache:true}
    });

    var all_currencies_resource = $resource( backendUrl + '/data/json/currency.json', {}, {
      query: {method:'GET', isArray:true, cache:true}
    });

    var graph_data_resource = $resource( backendUrl + 'data/graphs/evolution.json', {}, {
      query: {method:'GET', isArray:true, cache:true}
    });

    var analysis_data_resource = $resource( backendUrl + 'data/graphs/bcra.json', {}, {
      query: {method:'GET', isArray:true, cache:true}
    });

    var forecast_dates = $resource( backendUrl + 'data/forecast/json_dates_forecasted.json', {}, {
      query: {method:'GET', isArray:true, cache:true}
    });
    var forecast_values = $resource( backendUrl + 'data/forecast/json_forecasted.json', {}, {
      query: {method:'GET', isArray:false, cache:true}
    });
    var forecast_dates_history = $resource( backendUrl + 'data/forecast/json_dates_history.json', {}, {
      query: {method:'GET', isArray:true, cache:true}
    });
    var forecast_values_history = $resource( backendUrl + 'data/forecast/json_history.json', {}, {
      query: {method:'GET', isArray:false, cache:true}
    });


    function groupGraphData(rawData){
        var transformRawData = function transformRawData(raw){
          return _.chain(raw).map(function(b){
            var tmp_date = new Date(b.date);
            b.epoch = tmp_date.getTime()/1000;
            b.datepart = dateFormat(tmp_date);
            return b;
          }).value();
        };

        var allData = transformRawData(rawData);

        var dataByDate = _.groupBy(allData, function(a){return a.datepart;});

        var finalGrouped = _.chain(dataByDate).map(function(d){
          var max_oficial = _.max(d, function(val){
            if (val.source === 'Oficial'){return val.value;} else {return 0;}
          }).value;

          var sum_blue = _.reduce(d, function(memo, sum){
            if (sum.source !== 'Oficial'){ return memo + sum.value;} else {return memo;}
          }, 0);

          var count_blue = _.chain(d).filter(function(c) {
            return c.source !== 'Oficial';
          }).size().value();

          return {'date': dateFormat.parse(d[0].datepart), 'oficial': max_oficial, 'blue': sum_blue/count_blue};

        }).filter(function(d){
          return (d.oficial > 0 && d.blue > 0 && (d.oficial - d.blue) !== 0);
        }).sortBy(function(d){return d.date;}).value();

        return finalGrouped;
    }

    return {
        'last_price': last_price_resource,
        'all_currencies': all_currencies_resource,
        'graph_data': graph_data_resource,
        'analysis_data': analysis_data_resource,

        'forecast_data': function obtainData(callback){
          var mycall = callback;
          $q.all([forecast_dates.query().$promise, forecast_values.query().$promise,
            forecast_dates_history.query().$promise, forecast_values_history.query().$promise])
           .then( function(result) {

             var reorganized = {};
             var i;

             reorganized.history = [];
             for(i = 0; i < result[2].length; i++){
              reorganized.history.push({
                'date': dateFormat.parse(result[2][i]),
                'value': result[3].history[i]
              });
             }

             reorganized.forecast = [];
             for(i = 0; i < result[0].length; i++){
              reorganized.forecast.push({
                'date': dateFormat.parse(result[0][i]),
                'value': result[1].mean[i],
                'low': result[1].lower_80[i],
                'high': result[1].upper_80[i]
              });
             }


             mycall(reorganized);
           });
        },

        'extended_last_price': function extended_last_price(callback){
            var mycall = callback;
            last_price_resource.query({}, function(value){
                var newDolares = [];

                for(var i = 0; i < value.length;i++){
                    var dolar = value[i];
                    dolar.compra_dif = dolar.compra - dolar.compra_ayer;
                    dolar.venta_dif = dolar.venta - dolar.venta_ayer;
                    dolar.avg = (dolar.compra + dolar.venta) / 2;
                    dolar.avg_ayer = (dolar.compra_ayer + dolar.venta_ayer) / 2;
                    dolar.avg_dif = dolar.avg - dolar.avg_ayer;
                    newDolares.push(dolar);
                }

                mycall(value);
            });
        },

        'graph_evolution_data': function (callback){
            if(graph_evolution_data !== null){
                callback(graph_evolution_data);
            }else{

                var mycall = callback;
                graph_data_resource.query({}, function(rawData){

                  graph_evolution_data = groupGraphData(rawData);

                  mycall(graph_evolution_data);
                });
            }
        },

        'graph_gap_data': function (callback){
            if(graph_gap_data !== null){
                callback(graph_gap_data);
            }else{

                var mycall = callback;
                graph_data_resource.query({}, function(rawData){
                  graph_gap_data = _.chain(groupGraphData(rawData)).map(function(d){
                    return {'date': d.date, 'brecha': percGap(d.oficial, d.blue)*100};
                  }).value();

                  mycall(graph_gap_data);
                });
            }
        },
    };

  });
