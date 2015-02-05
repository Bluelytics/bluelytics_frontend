'use strict';

describe('Controller: AnalysisCtrl', function () {

  // load the controller's module
  beforeEach(module('bluelyticsFrontendApp'));

  var AnalysisCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AnalysisCtrl = $controller('AnalysisCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
