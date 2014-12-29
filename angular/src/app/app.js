/**
 * @ngdoc overview
 * @name utag
 * @description
 * # utag
 *
 * Main module of the application.
 */
angular
.module('utag', [
	'ngRoute',
	'ngDialog',
	'utag.config',
	'utag.utils',
	'utag.auth',
	'utag.main',
	'utag.tags',
	'utag.things'
])
.config(function RouteConfig($routeProvider) {
	'use strict';

	$routeProvider
		.when('/', {
			templateUrl: '/utag/main/main.html',
			controller: 'MainCtrl',
			controllerAs: 'ctrl'
		})
		// .when('/auth/login', {
		// 	templateUrl: '/utag/auth/login.html',
		// 	controller: 'AuthLoginCtrl',
		// 	controllerAs: 'ctrl'
		// })
		// .when('/auth/register', {
		// 	templateUrl: '/utag/auth/register.html',
		// 	controller: 'AuthRegisterCtrl',
		// 	controllerAs: 'ctrl'
		// })
		.when('/tags', {
			templateUrl: '/utag/tags/tags.html',
			controller: 'TagsCtrl',
			controllerAs: 'ctrl',
			// resolve: {
			//   'promise': function (Tags) {
			//     return Tags.query();
			//   }
			// }
		})
		.when('/tags/:id/view', {
			templateUrl: '/utag/tags/tag.html',
			controller: 'TagsDetailCtrl',
			controllerAs: 'ctrl',
			// resolve: {
			// 	tag: function($routeParams, Tags) {
			// 		return Tags.repo.get({id: $routeParams.id});
			// 	}
			// }
		})
		.when('/things', {
			templateUrl: '/utag/things/things.html',
			controller: 'ThingsCtrl',
			controllerAs: 'ctrl',
			// resolve: {
			//   'promise': function (Things) {
			//     return Things.query();
			//   }
			// }
		})
		.when('/things/:id/view', {
			templateUrl: '/utag/things/thing.html',
			controller: 'ThingsDetailCtrl',
			controllerAs: 'ctrl',
			// resolve: {
			// 	thing: function($routeParams, Things) {
			// 		return Things.repo.get({id: $routeParams.id});
			// 	}
			// }
		})
		.otherwise({
			redirectTo: '/'
		});
});
