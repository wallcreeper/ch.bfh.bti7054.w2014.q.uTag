'use strict';

describe('Service: Tag', function () {

  // load the service's module
  beforeEach(module('utagApp'));

  // instantiate service
  var Tag;
  beforeEach(inject(function (_Tag_) {
    Tag = _Tag_;
  }));

  it('should do something', function () {
    expect(!!Tag).toBe(true);
  });

});
