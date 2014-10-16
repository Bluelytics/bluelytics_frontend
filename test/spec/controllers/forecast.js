'use strict';

describe('Controller: ForecastCtrl', function () {

  // load the controller's module
  beforeEach(module('bluelyticsFrontendApp'));

  var ForecastCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ForecastCtrl = $controller('ForecastCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
