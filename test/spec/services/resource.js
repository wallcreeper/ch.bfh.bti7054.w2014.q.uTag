'use strict';

describe('Service: resource', function () {

  // load the service's module
  beforeEach(module('utagApp'));

  // instantiate service
  var resource;
  beforeEach(inject(function (_resource_) {
    resource = _resource_;
  }));

  it('should do something', function () {
    expect(!!resource).toBe(true);
  });

});
