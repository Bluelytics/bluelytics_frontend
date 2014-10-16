'use strict';

describe('Controller: WordcloudCtrl', function () {

  // load the controller's module
  beforeEach(module('bluelyticsFrontendApp'));

  var WordcloudCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WordcloudCtrl = $controller('WordcloudCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
