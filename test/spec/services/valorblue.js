'use strict';

describe('Service: Valorblue', function () {

  // load the service's module
  beforeEach(module('bluelyticsFrontendApp'));

  // instantiate service
  var Valorblue;
  beforeEach(inject(function (_Valorblue_) {
    Valorblue = _Valorblue_;
  }));

  it('should do something', function () {
    expect(!!Valorblue).toBe(true);
  });

});
