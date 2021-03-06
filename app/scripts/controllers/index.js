'use strict';

/**
 * @ngdoc function
 * @name bluelyticsFrontendApp.controller:HeaderController
 * @description
 * # HeaderController
 * Controller of the bluelyticsFrontendApp
 */
 angular.module('bluelyticsFrontendApp')
  .controller('HeaderController', function ($scope, $location, $translate, $mdSidenav, $state) {

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


    $scope.openLeft = function() {
      $mdSidenav('left').open();
    };
    $scope.closeLeft = function() {
      $mdSidenav('left').close();
    };

    $scope.openRight = function() {
      $mdSidenav('right').open();
    };
    $scope.closeRight = function() {
      $mdSidenav('right').close();
    };

    $scope.navigateTo = function(url) {
      $scope.closeLeft();
      $state.go(url);
    };

    $scope.menuoptions = [
      {
        url:'rates',
        name: 'INDEX.MENU.RATE',
        icon: 'editor:attach_money'
      },
      {
        url:'calculator',
        name: 'INDEX.MENU.CALCULATOR',
        icon: 'action:swap_horiz'
      },
      {
        url:'evolution',
        name: 'INDEX.MENU.EVOLUTION',
        icon: 'action:assessment'
      },
      {
        url:'gap',
        name: 'INDEX.MENU.GAP',
        icon: 'action:settings_ethernet'
      },
      {
        url:'api',
        name: 'INDEX.MENU.API',
        icon: 'file:cloud'
      },
      {
        url:'about',
        name: 'INDEX.MENU.ABOUT',
        icon: 'action:info'
      }
    ];

});
