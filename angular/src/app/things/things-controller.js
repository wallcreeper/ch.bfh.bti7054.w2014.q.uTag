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
.controller('ThingsCtrl', function ThingsCtrl ($scope, $log, $controller, $location, Things) {
	'use strict';

	$controller('ThingsBaseCtrl', { $scope: $scope });

	if (!$scope.things) {
		$scope.things = Things.repo.query(function(data, responseHeaders) {
			// $log.info(data);
			// $log.info(responseHeaders);
		}, function(httpResponse) {
			// $log.info(httpResponse);
		});
	}

	$scope.showDetailView = function showDetailView(id) {
		$location.path('/things/'+ id + '/view');
	};

})

/**
 * @ngdoc function
 * @name utag.tags.controller:ThingsDetailCtrl
 * @description
 * # ThingsDetailCtrl
 * Controller of the utag app
 */
.controller('ThingsDetailCtrl', function ThingsDetailCtrl ($scope, $log, $controller, $routeParams, Things) {
  'use strict';

  $controller('ThingsBaseCtrl', { $scope: $scope });

  if (!$scope.thing) {
	  $scope.thing = Things.repo.get({id: $routeParams.id}, function(data, responseHeaders) {
			// $log.info(data);
			// $log.info(responseHeaders);
		}, function(httpResponse) {
			// $log.info(httpResponse);
		});
  }

});
