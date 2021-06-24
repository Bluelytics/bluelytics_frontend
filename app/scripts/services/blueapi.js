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

    var last_price_resource = $resource( backendUrl + 'v2/latest', {}, {
      query: {method:'GET', isArray:false, cache:true}
    });

    var all_currencies_resource = $resource( backendUrl + 'data/json/currency.json', {}, {
      query: {method:'GET', isArray:true, cache:true}
    });

    var graph_data_resource = $resource( backendUrl + 'v2/evolution.json', {}, {
      query: {method:'GET', isArray:true, cache:true}
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
            if (val.source === 'Oficial'){return val.value_sell;} else {return 0;}
          }).value_sell;

          var sum_blue = _.reduce(d, function(memo, sum){
            if (sum.source !== 'Oficial'){ return memo + sum.value_sell;} else {return memo;}
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


        'extended_last_price': function extended_last_price(callback){
            var mycall = callback;
            last_price_resource.query({}, function(value){
                
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
