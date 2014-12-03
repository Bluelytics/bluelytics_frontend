'use strict';

/**
 * @ngdoc function
 * @name bluelyticsFrontendApp.controller:HeaderController
 * @description
 * # HeaderController
 * Controller of the bluelyticsFrontendApp
 */
 angular.module('bluelyticsFrontendApp')
  .controller('HeaderController', function ($scope, $location, $translate) {

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.anyDolarActive = function () {
        return $location.path().slice(0, 7) === '/dolar/' || $location.path() === '/';
    };


    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
    };

    $scope.activeLang = function(langKey){

      if ($translate.use() === langKey){
        return true;
      }else{
        return false;
      }
    };

});
