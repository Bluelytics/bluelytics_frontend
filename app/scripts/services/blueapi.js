'use strict';

/**
 * @ngdoc service
 * @name bluelyticsFrontendApp.blueAPI
 * @description
 * # blueAPI
 * Service in the bluelyticsFrontendApp. - API of bluelytics wrapper
 */
angular.module('bluelyticsFrontendApp')
  .service('blueAPI', ['$resource', function blueAPI($resource) {
    var valoresBlue = null;

    var api_url = 'http://localhost:8000/';

    var last_price_resource = $resource( api_url + 'api/last_price', {}, {
      query: {method:'GET', isArray:true, cache:true}
    });

    var all_currencies_resource = $resource( api_url + 'api/all_currencies', {}, {
      query: {method:'GET', isArray:true, cache:true}
    });

    return {
        'last_price': last_price_resource,
        'all_currencies': all_currencies_resource,
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
        }
    };

  }]);
