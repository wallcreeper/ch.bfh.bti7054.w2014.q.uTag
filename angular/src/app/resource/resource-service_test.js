/* jshint strict:false, globalstrict:false */
/* global describe, it, beforeEach, inject, module */
describe('Service: resource', function () {

  // load the service's module
  beforeEach(module('utag.resource'));

  // instantiate service
  var resource;
  beforeEach(inject(function (_resource_) {
    resource = _resource_;
  }));

  it('should do something', function () {
    expect(!!resource).toBe(true);
  });

});