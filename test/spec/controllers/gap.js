'use strict';

describe('Controller: GapCtrl', function () {

  // load the controller's module
  beforeEach(module('bluelyticsFrontendApp'));

  var GapCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GapCtrl = $controller('GapCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
