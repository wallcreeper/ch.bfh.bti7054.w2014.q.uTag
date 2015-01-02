/**
 * Controllers of the utag.main module
 */
angular
.module('utag.things.controller', [])

/**
 * @ngdoc function
 * @name utag.tags.controller:ThingsBaseCtrl
 * @description
 * # ThingsBaseCtrl
 * Controller of the utag app
 */
.controller('ThingsBaseCtrl', function ThingsBaseCtrl ($scope, $log, $location, Things, colorCache) {
	'use strict';

	$scope.color = function color(tag, alpha) {
		return colorCache.get(tag.name, alpha).rgba;
	};

	$scope.showDetailView = function showDetailView(id) {
		$location.path('/things/'+ id + '/view');
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

	// extend ThingsCtrl
	$controller('ThingsBaseCtrl', { $scope: $scope })

	$scope.title = "Things";
	$scope.things = [];

	activate();

	function activate() {
		Things.repo.query(function(data) {
				$scope.things = data;
		});
	}

})

/**
 * @ngdoc function
 * @name utag.tags.controller:ThingsDetailCtrl
 * @description
 * # ThingsDetailCtrl
 * Controller of the utag app
 */
.controller('ThingsDetailCtrl', function ThingsDetailCtrl ($scope, $log, $controller, $routeParams, $location, searcher, Things, Tags) {
	'use strict';

	// extend ThingsCtrl
	$controller('ThingsBaseCtrl', { $scope: $scope })

	$scope.title = "ThingDetail";

  //pre-Initialize structure for ui-select
	$scope.thing = { tags: [] };

  $scope.searchTags = function searchTags(query) {
    return searcher.searchTags(query);
  }

  $scope.saveThing = function saveThing(thing) {
    thing.tags = tagsTransformToName(thing.tags);
		Things.repo.update({id: $routeParams.id}, thing, function(data) {$location.path('/');}, function(data) {console.log("fail")});
	};

  $scope.cancel = function cancel() {
    $location.path('/');
  }

  activate();

	function activate() {
		if ($routeParams.id) {
			Things.repo.get({id: $routeParams.id}, function(data) {
					$scope.thing = data;
          $scope.thing.tags = tagsTranformToText($scope.thing.tags);
			});
		}
    Tags.repo.query(function(data) {
      $scope.tags = tagsTranformToText(data);
    });
	}

  function tagsTranformToText(tags) {
    var newTags = [];
    angular.forEach(tags, function(tag) {
      var newTag = {id: tag.id, text: tag.name};
      newTags.push(newTag);
    });
    return newTags;
  }

  function tagsTransformToName(tags) {
    console.log(tags);
    var newTags = [];
    angular.forEach(tags, function(tag) {
      var newTag = {id: tag.id, name: tag.text};
      newTags.push(newTag);
    });
    console.log(newTags);
    return newTags;
  }

});
