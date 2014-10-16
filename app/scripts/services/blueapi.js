'use strict';

/**
 * @ngdoc service
 * @name bluelyticsFrontendApp.blueAPI
 * @description
 * # blueAPI
 * Service in the bluelyticsFrontendApp. - API of bluelytics wrapper
 */
angular.module('bluelyticsFrontendApp')
  .service('blueAPI', function blueAPI($resource, $q, _) {
    var valoresBlue = null;
    var graph_evolution_data = null;
    var graph_gap_data = null;

    var dateFormat = d3.time.format("%d/%m/%Y");

    var percGap = function percGap(ofi, blue){
        return (blue - ofi) / ofi;
    }

    var api_url = 'http://localhost:8000/';

    var last_price_resource = $resource( api_url + 'api/last_price', {}, {
      query: {method:'GET', isArray:true, cache:true}
    });

    var all_currencies_resource = $resource( api_url + 'api/all_currencies', {}, {
      query: {method:'GET', isArray:true, cache:true}
    });

    var graph_data_resource = $resource( api_url + 'api/graph_data', {}, {
      query: {method:'GET', isArray:false, cache:true}
    });

    var wordcloud_oficialistas_resource = $resource( api_url + 'data/words/oficialistas.json', {}, {
      query: {method:'GET', isArray:true, cache:true}
    });

    var wordcloud_oposicion_resource = $resource( api_url + 'data/words/oposicion.json', {}, {
      query: {method:'GET', isArray:true, cache:true}
    });

    var forecast_dates = $resource( api_url + 'data/forecast/json_dates_forecasted.json', {}, {
      query: {method:'GET', isArray:true, cache:true}
    });
    var forecast_values = $resource( api_url + 'data/forecast/json_forecasted.json', {}, {
      query: {method:'GET', isArray:false, cache:true}
    });
    var forecast_dates_history = $resource( api_url + 'data/forecast/json_dates_history.json', {}, {
      query: {method:'GET', isArray:true, cache:true}
    });
    var forecast_values_history = $resource( api_url + 'data/forecast/json_history.json', {}, {
      query: {method:'GET', isArray:false, cache:true}
    });


    return {
        'last_price': last_price_resource,
        'all_currencies': all_currencies_resource,
        'graph_data': graph_data_resource,
        'wordcloud_oficialistas': wordcloud_oficialistas_resource,
        'wordcloud_oposicion': wordcloud_oposicion_resource,

        'forecast_data': function obtainData(callback){
          var mycall = callback;
          $q.all([forecast_dates.query().$promise, forecast_values.query().$promise,
            forecast_dates_history.query().$promise, forecast_values_history.query().$promise])
           .then( function(result) {
             
             var reorganized = {};

             reorganized.history = [];
             for(var i = 0; i < result[2].length; i++){
              reorganized.history.push({
                'date': dateFormat.parse("01/" + result[2][i]),
                'value': result[3].history[i]
              });
             }

             reorganized.forecast = [];
             for(var i = 0; i < result[0].length; i++){
              reorganized.forecast.push({
                'date': dateFormat.parse("01/" + result[0][i]),
                'value': result[1].mean[i],
                'low': result[1].lower_80[i],
                'high': result[1].upper_80[i]
              });
             }


             mycall(reorganized);
           })
        },

        'extended_last_price': function extended_last_price(callback){
            var mycall = callback;
            last_price_resource.query({}, function(value, headers){
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
            if(graph_evolution_data != null){
                callback(graph_evolution_data);
            }else{

                var mycall = callback;
                graph_data_resource.query({}, function(rawData, headers){
                  var transformData = function transformData(v){
                    return [new Date(v.date),  v.value];
                  };

                  var finalData = []

                  for(var key in rawData){
                    if(rawData.hasOwnProperty(key) && key != '$promise' && key != '$resolved'){
                      finalData.push({
                        'values': _.map(rawData[key], transformData),
                        'key': key
                      });
                    }
                  }

                  graph_evolution_data = finalData;

                  mycall(graph_evolution_data);
                });
            }
        },

        'graph_gap_data': function (callback){
            if(graph_gap_data != null){
                callback(graph_gap_data);
            }else{

                var mycall = callback;
                graph_data_resource.query({}, function(rawData, headers){
                    var allData = [];

                  for(var key in rawData){
                      if(rawData.hasOwnProperty(key) && key != '$promise' && key != '$resolved'){
                          var appendData = _.chain(rawData[key]).map(function(b){
                            var tmp_date = new Date(b.date);
                            b.epoch = tmp_date.getTime()/1000;
                            b.datepart = dateFormat(tmp_date);
                            b.source = key;
                            return b;
                          }).value();
                          allData = allData.concat(appendData);
                        }
                    }
                    

                  var dataByDate = _.groupBy(allData, function(a){return a.datepart;});

                  var finalGrouped = _.chain(dataByDate).map(function(d){
                    var sum_oficial = _.reduce(d, function(memo, sum){
                      if (sum.source == 'Oficial'){ return memo + sum.value;} else {return memo;}
                    }, 0);

                    var sum_blue = _.reduce(d, function(memo, sum){
                      if (sum.source != 'Oficial'){ return memo + sum.value;} else {return memo;}
                    }, 0);

                    var count_blue = _.chain(d).filter(function(c) {
                      return c.source != 'Oficial';
                    }).size().value();

                    return {'date': _.max(d, function(a){return a.epoch;}).date, 'oficial': sum_oficial, 'blue': sum_blue/count_blue}

                  }).filter(function(d){
                    return (d.oficial > 0 && d.blue > 0);
                  }).map(function(d){
                    return [new Date(d.date), percGap(d.oficial, d.blue)]
                  }).value();

                  var finalData = [{
                    'values': finalGrouped,
                    'key': 'Brecha'
                  }];

                  graph_gap_data = finalData;

                  mycall(graph_gap_data);
                });
            }
        },
    };

  });
