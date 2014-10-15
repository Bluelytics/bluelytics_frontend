'use strict';

/**
 * @ngdoc service
 * @name bluelyticsFrontendApp.valorBlue
 * @description
 * # valorBlue
 * Service in the bluelyticsFrontendApp.
 */
angular.module('bluelyticsFrontendApp')
  .service('valorBlue', ['$resource', function valorBlue($resource) {
    var valoresBlue = null;

    return $resource('http://localhost:8000/api/last_price', {}, {
      query: {method:'GET', isArray:false, cache:true}
    });

  }]);
