'use strict';

/**
 * @ngdoc function
 * @name bluelyticsFrontendApp.controller:HeaderController
 * @description
 * # HeaderController
 * Controller of the bluelyticsFrontendApp
 */
function HeaderController($scope, $location) 
{ 
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}