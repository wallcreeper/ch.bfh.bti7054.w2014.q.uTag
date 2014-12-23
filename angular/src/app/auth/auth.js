/**
 * The utag.auth module
 */
angular
.module('utag.auth', [
	'http-auth-interceptor',
	'utag.auth.controller',
	'utag.auth.service',
])
.config(function($httpProvider) {
	'use strict';
	$httpProvider.interceptors.push('authInterceptor');
})
.run(function ($rootScope, /* AUTH_EVENTS, */ authSrvc) {
	'use strict';
	$rootScope.$on('$stateChangeStart', function (event, next) {
		if (!authSrvc.isAuthorized()) {
			event.preventDefault();
			if (authSrvc.isAuthenticated()) {
				$log.info('is not authorized');
				$location.path('/auth/login');
			} else {
				$log.info('is not authenticated');
				$location.path('/auth/login');
			}
		}

		// var authorizedRoles = next.data.authorizedRoles;
		// if (!authSrvc.isAuthorized(authorizedRoles)) {
		// 	event.preventDefault();
		// 	if (authSrvc.isAuthenticated()) {
		// 		// user is not allowed
		// 		$rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
		// 	} else {
		// 		// user is not logged in
		// 		$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
		// 	}
		// }
	});
});
