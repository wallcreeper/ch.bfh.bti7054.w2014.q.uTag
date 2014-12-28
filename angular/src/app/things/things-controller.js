/**
 * Controllers of the utag.main module
 */
angular
.module('utag.things.controller', [])

/**
 * @ngdoc function
 * @name utag.tags.controller:TagsBaseCtrl
 * @description
 * # TagsBaseCtrl
 * Controller of the utag app
 */
.controller('ThingsBaseCtrl', function TagsBaseCtrl ($scope, $log, Things, colorCache) {
  'use strict';

  $scope.color = function color(tag, alpha) {
  	return colorCache.get(tag.name, alpha).rgba;
  };

})

/**
 * @ngdoc function
 * @name utag.things.controller:ThingsCtrl
 * @description
 * # ThingsCtrl
 * Controller of the utag app
 */
.controller('ThingsCtrl', function ThingsCtrl ($scope, $log, $controller, Things) {
	'use strict';

	$controller('ThingsBaseCtrl', { $scope: $scope });

	$scope.things = Things.repo.query(function(data, responseHeaders) {
		// $log.info(data);
		// $log.info(responseHeaders);
	}, function(httpResponse) {
		// $log.info(httpResponse);
	});

});
