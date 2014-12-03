'use strict';

/**
 * @ngdoc function
 * @name bluelyticsFrontendApp.controller:HeaderController
 * @description
 * # HeaderController
 * Controller of the bluelyticsFrontendApp
 */
 angular.module('bluelyticsFrontendApp')
  .controller('HeaderController', ['$scope', '$location', function ($scope, $location) {

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.anyDolarActive = function () {
        return $location.path().slice(0, 7) === '/dolar/' || $location.path() === '/';
    };

    $scope.menuTooltips = {
      'cotizacion': {'title': 'Cotización'},
      'calculadora': {'title': 'Calculadora'},
      'evolucion': {'title': 'Evolución'},
      'brecha': {'title': 'Brecha'},
      'cobertura': {'title': 'Cobertura'},
      'prediccion': {'title': 'Predicción'},
      'api': {'title': 'API'},
      'acerca': {'title': 'Acerca de'},

    };

}]);
