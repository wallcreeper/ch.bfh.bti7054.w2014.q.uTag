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
.controller('MainCtrl', function MainCtrl ($scope, $controller, $log, searcher, selectedTagsCache, Tags, Things) {
	'use strict';

	// extend MainCtrl
	$controller('TagsBaseCtrl', { $scope: $scope });
	$controller('ThingsBaseCtrl', { $scope: $scope });

	// variables
	$scope.title = 'Main';
	$scope.tags = [];
	$scope.selectedTags = selectedTagsCache.all();
	$scope.things = [];
	$scope.filteredThings = [];
	$scope.tagKeywords = [];
	$scope.thingKeywords = [];

	// functions
	$scope.thingsFilter = thingsFilter;

	$scope.selectTag = function(tag) {
		selectedTagsCache.push(tag);
		$scope.selectedTags = selectedTagsCache.all();
	};

	$scope.deselectTag = function(tag) {
		selectedTagsCache.pop(tag);
		$scope.selectedTags = selectedTagsCache.all();
	};

	$scope.clearSelectedTags = function() {
		selectedTagsCache.clear();
		$scope.selectedTags = [];
	};

	$scope.$watchCollection('selectedTags', function (newVal, oldVal) {
		$log.info('watchCollection');
		// $log.info(newVal, oldVal);

		if (newVal.length > 0) {
			$scope.filteredThings = thingsFilter($scope.things, newVal);
		} else {
			$scope.filteredThings = [];
			$scope.clearSelectedTags();
		}

		activate();
	});

	$scope.searchTags = function() {
		var keywords = $scope.tagKeywords ? $scope.tagKeywords.split(' ') : [];
		searcher.searchTags(keywords).then(function (response) {
			$scope.tags = response.data;
		});
	};

	$scope.searchThings = function() {
		var keywords = $scope.thingKeywords ? $scope.thingKeywords.split(' ') : [];
		searcher.searchThingsByTags(keywords).then(function (response) {
			$scope.filteredThings = response.data;
		});
	};

	function activate() {
		if ($scope.tags.length === 0 || $scope.filteredThings.length === 0) {
			fetchThingsWithTags();
		}
	}

	function fetchTags(things) {
		var tags = [];
		for (var i = things.length - 1; i >= 0; i--) {
			for (var j = things[i].tags.length - 1; j >= 0; j--) {
				tags.push(things[i].tags[j]);
			}
		}
		return tags;
	}

	function fetchThingsWithTags() {
		Things.repo.query(function (data) {
			$scope.tags = fetchTags(data);
			$scope.things = data;
			if ($scope.selectedTags.length > 0) {
				$scope.filteredThings = thingsFilter($scope.things, $scope.selectedTags);
			} else {
				$scope.filteredThings = data;
			}
		});
	}

	function thingsFilter(things, tags) {
		// $log.info(things, tags);
		return things.filter(function (thing) {
			for (var i = thing.tags.length - 1; i >= 0; i--) {
				for (var j = tags.length - 1; j >= 0; j--) {
					if (tags[j].id === thing.tags[i].id) {
						return true;
					}
				}
			}
			return false;
		});
	}

	// $log.info($scope);

});
