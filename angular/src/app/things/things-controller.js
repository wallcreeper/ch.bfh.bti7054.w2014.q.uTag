/**
 * Controllers of the utag.things module
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
.controller('ThingsBaseCtrl', function ThingsBaseCtrl ($scope, $controller, $location, ngDialog) {
	'use strict';

	$controller('TagsBaseCtrl', { $scope: $scope });

	$scope.showThingDetailView = function showThingsDetailView(id) {
		// console.log("$scope.showThingDetailView")
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
.controller('ThingsCtrl', function ThingsCtrl ($scope, $controller, Things) {
	'use strict';

	// extend ThingsCtrl
	$controller('ThingsBaseCtrl', { $scope: $scope });

	$scope.title = 'Things';
	$scope.things = $scope.things || [];

	activate();

	function activate() {
		if ($scope.things.length === 0) {
			Things.repo.query(function(data) {
					$scope.things = data;
			});
		}
	}

})

/**
 * @ngdoc function
 * @name utag.tags.controller:ThingsDetailCtrl
 * @description
 * # ThingsDetailCtrl
 * Controller of the utag app
 */
.controller('ThingsDetailCtrl', function ThingsDetailCtrl ($scope, $log, $controller, $routeParams, $location, ngDialog, api, Tags, Things) {
	'use strict';

	// extend ThingsCtrl
	$controller('ThingsBaseCtrl', { $scope: $scope });

	$scope.title = 'ThingDetail';
	$scope.thing = $scope.thing || {};
	$scope.tags = $scope.tags || [];

	$scope.searchTags = function searchTags(keywords) {
		keywords = keywords ? keywords.split(' ') : [];
		return api.searchTags(keywords);
	}

	$scope.showCreateDialog = showCreateDialog;
	$scope.showDetailsDialog = showDetailsDialog;
	$scope.showDeleteDialog = showDeleteDialog;

	$scope.saveThing = function saveThing(thing) {
		Things.repo.update({id: thing.id}, thing, function(data) {$location.path('/');}, function(data) {
			$scope.messages = data.data.errors;
			// console.log("failAtUpdate");
		});
	};

	$scope.dialogShown = false;

	function showCreateDialog() {
		if (!$scope.dialogShown) {
			var dialog = ngDialog.open({
				templateUrl: '/utag/things/thing-create-directive.html',
				controller: 'ThingsCreateCtrl',
				className: 'ngdialog-theme-plain',
				scope: $scope,
			});
			$scope.dialogShown = true;

			dialog.closePromise.then(function (data) {
				$scope.dialogShown = false;
				$scope.$parent.fetchTags();
				$scope.$parent.fetchThings();
			});
		}
	}

	function showDetailsDialog(thing) {
		if (!$scope.dialogShown) {
			var dialog = ngDialog.open({
				name: 'detail',
				templateUrl: '/utag/things/thing-edit-directive.html',
				controller: 'ThingsUpdateCtrl',
				className: 'ngdialog-theme-plain',
				scope: $scope,
			});
			$scope.dialogShown = true;

			dialog.closePromise.then(function (data) {
				$scope.dialogShown = false;
				// refresh tags
				$scope.$parent.fetchTags();
				// $log.info(data.id + ' has been dismissed.');
			});
		}
	}

	function showDeleteDialog(thing) {
		ngDialog.openConfirm({
			name: 'delete',
			controller: 'ThingsUpdateCtrl',
			className: 'ngdialog-theme-plain',
			template:'\
				<p>Are you sure you want to delete the Thing "{{thing.name}}" with all its tags?</p>\
				<div class="ngdialog-buttons">\
						<button type="button" class="ngdialog-button ngdialog-button-secondary" data-ng-click="closeThisDialog(0)">No</button>\
						<button type="button" class="ngdialog-button ngdialog-button-primary" data-ng-click="confirm(1)">Yes</button>\
				</div>',
			plain: true,
			scope: $scope,
		}).then(function (value) {
			// $log.info('Modal promise resolved. Value: ', value);
			Things.repo.delete({id: thing.id}, thing, function(data) {$location.path('/');}, function(data) {
				$scope.messages = data.data.errors;
				// $log.info("failAtDelete");
			});

			// remove deleted things
			for (var i = $scope.filteredThings.length - 1; i >= 0; i--) {
				if ($scope.filteredThings[i].id === thing.id) {
					$scope.filteredThings.splice(i, 1);
					break;
				}
			};

			// refresh tags
			$scope.$parent.fetchTags();

			ngDialog.close('detail');
		}, function (reason) {
			// $log.info('Modal promise rejected. Reason: ', reason);
		});

		return true;
	}

	activate();

	function activate() {
		if ($routeParams.id) {
			Things.repo.get({id: $routeParams.id}, function(data) {
				$scope.thing = data;
			});
		}
		if ($scope.tags.length === 0) {
			$scope.tags = api.userTagsDistinct();
		}
	}

})

/**
 * @ngdoc function
 * @name utag.tags.controller:ThingsUpdateCtrl
 * @description
 * # ThingsUpdateCtrl
 * Controller of the utag app
 */
.controller('ThingsUpdateCtrl', function ThingsUpdateCtrl ($scope, $log, $controller, $routeParams, $location, ngDialog, api, Tags, Things) {
	'use strict';

	// extend ThingsCtrl
	$controller('ThingsBaseCtrl', { $scope: $scope });

	$scope.title = 'ThingUpdate';
	$scope.thing = $scope.thing || {};
	$scope.tags = $scope.tags || [];

	$scope.searchTags = function searchTags(keywords) {
		keywords = keywords ? keywords.split(' ') : [];
		return api.searchTags(keywords);
	}

	$scope.saveThing = function saveThing(thing) {
		Things.repo.update({id: $scope.thing.id}, thing, function(data) {
			$scope.closeThisDialog();
			$location.path('/');
		}, function(data) {
			$scope.messages = data.data.errors;
			// console.log("failAtUpdate");
		});
	};

	activate();

	function activate() {
		if ($scope.tags.length === 0) {
			$scope.tags = api.userTagsDistinct();
		}
	}

})


.controller('ThingsCreateCtrl', function ThingsCreateCtrl ($scope, $log, $controller, $routeParams, $location, ngDialog, api, Tags, Things) {
	'use strict';

	// extend ThingsCtrl
	$controller('ThingsBaseCtrl', { $scope: $scope });

	$scope.title = 'ThingDetail';
	$scope.thing = {name: '', description: '', tags: [], thingable: {id: '', uri: ''}};
	$scope.tags = $scope.tags || [];


	$scope.searchTags = function searchTags(keywords) {
		keywords = keywords ? keywords.split(' ') : [];
		return api.searchTags(keywords);
	}

	$scope.createThing = function createThing(thing) {
		Things.repo.save('', thing, function(data) {
			$scope.closeThisDialog();
			$location.path('/');
		}, function(data) {
			$scope.messages = data.data.errors;
		});

	};

	$scope.cancel = function cancel() {
		$location.path('/');
	};

	activate();

	function activate() {
		if ($scope.tags.length === 0) {
			$scope.tags = api.userTagsDistinct();
		}
	}

});

