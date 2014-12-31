/**
 * Controllers of the utag.main module
 */
angular
.module('utag.tags.controller', [])

/**
 * @ngdoc function
 * @name utag.tags.controller:TagsBaseCtrl
 * @description
 * # TagsBaseCtrl
 * Controller of the utag app
 */
.controller('TagsBaseCtrl', function TagsBaseCtrl ($scope, $log, $location, Tags, colorCache) {
	'use strict';

	$scope.color = function color(tag, alpha) {
		return colorCache.get(tag.name, alpha).rgba;
	};

	$scope.showDetailView = function showDetailView(id) {
		$location.path('/tags/'+ id + '/view');
	};

})

/**
 * @ngdoc function
 * @name utag.tags.controller:TagsCtrl
 * @description
 * # TagsCtrl
 * Controller of the utag app
 */
.controller('TagsCtrl', function TagsCtrl ($scope, $log, $controller, Tags) {
	'use strict';

	// extend TagsCtrl
	$controller('TagsBaseCtrl', { $scope: $scope })

	$scope.title = "Tags";
	$scope.tags = [];

	activate();

	function activate() {
		Tags.repo.query(function(data) {
			$scope.tags = data;
		});
	}

})

/**
 * @ngdoc function
 * @name utag.tags.controller:TagsDetailCtrl
 * @description
 * # TagsDetailCtrl
 * Controller of the utag app
 */
.controller('TagsDetailCtrl', function TagsDetailCtrl ($scope, $log, $controller, $routeParams, Tags) {
	'use strict';

	// extend TagsCtrl
	$controller('TagsBaseCtrl', { $scope: $scope })

	$scope.title = "TagDetail";
	$scope.tag = {};

	activate();

	function activate() {
		if ($routeParams.id) {
			Tags.repo.get({id: $routeParams.id}, function(data) {
					$scope.tag = data;
			});
		}

	}

});
