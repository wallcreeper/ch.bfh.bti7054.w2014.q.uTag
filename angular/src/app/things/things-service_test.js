/* jshint strict:false, globalstrict:false */
/* global describe, it, beforeEach, inject, module */
describe('Service: things', function () {

  // load the service's module
  beforeEach(module('utag.things'));

  // instantiate service
  var things;
  beforeEach(inject(function (_things_) {
    things = _things_;
  }));

  it('should do something', function () {
    expect(!!things).toBe(true);
  });

});