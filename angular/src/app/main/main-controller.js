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
.controller('MainCtrl', function MainCtrl ($scope, $log, $controller, tags, things) {
	'use strict';

	// Experiment for combining different Controllers (as a reference)
	// $controller('TagsCtrl', { $scope: $scope, tags: tags });
	// $controller('ThingsCtrl', { $scope: $scope, things: things });

	$log.info($scope);

});
