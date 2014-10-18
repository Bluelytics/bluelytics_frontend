'use strict';

describe('Service: backendUrl', function () {

  // load the service's module
  beforeEach(module('bluelyticsFrontendApp'));

  // instantiate service
  var backendUrl;
  beforeEach(inject(function (_backendUrl_) {
    backendUrl = _backendUrl_;
  }));

  it('should do something', function () {
    expect(!!backendUrl).toBe(true);
  });

});
