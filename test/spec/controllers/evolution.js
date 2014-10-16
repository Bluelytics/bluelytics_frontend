'use strict';

describe('Controller: EvolutionCtrl', function () {

  // load the controller's module
  beforeEach(module('bluelyticsFrontendApp'));

  var EvolutionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EvolutionCtrl = $controller('EvolutionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
