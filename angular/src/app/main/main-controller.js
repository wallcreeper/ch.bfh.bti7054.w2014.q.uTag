/**
 * Controllers of the utag.main module
 */
angular
.module('utag.main.controller', [])

/**
 * @ngdoc function
 * @name utag.main.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the utag app
 */
.controller('MainCtrl', function MainCtrl ($scope, $log, Tags, Things) {
	'use strict';

	$scope.tags = Tags.repo.query(function(data, responseHeaders) {
		$log.info(data);
		$log.info(responseHeaders);
	}, function(httpResponse) {
		$log.info(httpResponse);
	});

	$scope.things = Things.repo.query(function(data, responseHeaders) {
		$log.info(data);
		$log.info(responseHeaders);
	}, function(httpResponse) {
		$log.info(httpResponse);
	});
});
