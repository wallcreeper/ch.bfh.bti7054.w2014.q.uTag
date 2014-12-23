/**
 * Controllers of the utag.main module
 */
angular
.module('utag.things.controller', [])

/**
 * @ngdoc function
 * @name utag.things.controller:ThingsCtrl
 * @description
 * # ThingsCtrl
 * Controller of the utag app
 */
.controller('ThingsCtrl', function ThingsCtrl ($scope, Things) {
	'use strict';

	$scope.things = Things.repo.query();

});
