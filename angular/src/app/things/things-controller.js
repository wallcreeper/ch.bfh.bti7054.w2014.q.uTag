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
.controller('ThingsCtrl', function ThingsCtrl ($scope, $log, Things) {
	'use strict';

	$scope.things = Things.repo.query(function(data, responseHeaders) {
		$log.info(data);
		$log.info(responseHeaders);
	}, function(httpResponse) {
		$log.info(httpResponse);
	});

});
