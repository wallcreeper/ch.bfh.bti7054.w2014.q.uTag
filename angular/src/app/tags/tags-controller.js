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
.controller('TagsBaseCtrl', function TagsBaseCtrl ($scope, $location) {
	'use strict';

	$scope.showTagDetailView = function showTagsDetailView(id) {
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
.controller('TagsCtrl', function TagsCtrl ($scope, $controller, Tags) {
	'use strict';

	// extend TagsCtrl
	$controller('TagsBaseCtrl', { $scope: $scope });

	$scope.title = 'Tags';
	$scope.tags = $scope.tags || [];

	activate();

	function activate() {
		if ($scope.tags.length === 0) {
			Tags.repo.query(function(data) {
				$scope.tags = data;
			});
		}
	}

})

/**
 * @ngdoc function
 * @name utag.tags.controller:TagsDetailCtrl
 * @description
 * # TagsDetailCtrl
 * Controller of the utag app
 */
.controller('TagsDetailCtrl', function TagsDetailCtrl ($scope, $controller, $routeParams, Tags) {
	'use strict';

	// extend TagsCtrl
	$controller('TagsBaseCtrl', { $scope: $scope });

	$scope.title = 'TagDetail';
	$scope.tag = $scope.tag || {};

	activate();

	function activate() {
		if ($routeParams.id) {
			Tags.repo.get({id: $routeParams.id}, function(data) {
					$scope.tag = data;
			});
		}
	}

});
