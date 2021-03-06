'use strict';

/**
 * @ngdoc function
 * @name bluelyticsFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bluelyticsFrontendApp
 */
angular.module('bluelyticsFrontendApp')
  .controller('MainCtrl', function ($scope, $location, blueAPI) {
    $scope.loading = true;
    $scope.selectedIndex = 1;

    blueAPI.extended_last_price(function(value){
      $scope.loading = false;
      $scope.dolares = value;
      delete $scope.dolares.last_update;
      delete $scope.dolares.oficial_euro;
      delete $scope.dolares.blue_euro;
    });

    $scope.esOficial = function(dolar){
      if (dolar.name.indexOf('oficial') > -1) {
        return true;
      }else{
        return false;
      }
    };

    $scope.esBlue = function(dolar){
      return !$scope.esOficial(dolar);
    };

    $scope.iconFor = function(value){
      if(value === 0){
        return 'action:trending_neutral';
      } else if(value > 0){
        return 'action:trending_up';
      } else if(value < 0){
        return 'action:trending_down';
      }
    };

    $scope.classFor = function(value){
      if(value === 0){
        return 'neutral';
      } else if(value > 0){
        return 'up';
      } else if(value < 0){
        return 'down';
      }
    };

  });
