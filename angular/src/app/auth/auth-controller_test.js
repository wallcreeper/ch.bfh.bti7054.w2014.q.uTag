/* jshint strict:false, globalstrict:false */
/* global describe, it, beforeEach, inject, module */
describe('Controller: AuthCtrl', function () {
	var 
		ctrl,
		scope,
		tagService,
		promise,
		$httpBackend;

	// load the controller's module
	beforeEach(module('utag'));

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope, $injector) {
		$httpBackend = $injector.get('$httpBackend');
		$httpBackend.when('GET', 'api/v1/auth').respond([
			{ id: 1, name: 'tagA' }, 
			{ id: 2, name: 'tagB' }
		]);
		$httpBackend.expectGET('api/v1/auth');

		tagService = $injector.get('Auth');
		promise = tagService.fetchAll();

		scope = $rootScope.$new();
		scope.tags = promise.data;

		ctrl = $controller('AuthCtrl', {
			$scope: scope,
		});

	}));

	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
		$httpBackend.flush();
	});

	it('should attach a list of tags to the scope', function ($scope) {
		console.log($scope.tags);
		expect($scope.tags).toBeUndefined();

		promise.then(function (data) {
			console.log(data);
		});
		// expect($scope.tags.length).toBe(2);

		// console.log($scope);
	});
});
