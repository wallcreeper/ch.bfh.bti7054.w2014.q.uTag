/**
 * Services of the utag.auth module
 */
angular
.module('utag.auth.service', [
	'http-auth-interceptor',
	'ngStorage',
])

/**
 * @ngdoc service
 * @name utag.auth.service:authSession
 * @description
 * # authSession
 * Service in the utag app.
 */
.factory('authSession', function authSession($rootScope, $localStorage, $sessionStorage, DSCacheFactory, $log) {
	'use strict';

	$rootScope.$storage = $sessionStorage;

	var isActive = false;

	var provider = {

		setOAuth2Session: function(data) {
			isActive = true;

			$rootScope.$storage.accessToken = data.access_token;
			$rootScope.$storage.tokenType = data.token_type;
			$rootScope.$storage.expiresIn = data.expires_in;
			$rootScope.$storage.expires = new Date(new Date().getTime() + 1000 * data.expires_in);
			$rootScope.$storage.isLoggedIn = isActive;
		},

		resetOAuth2Session: function(data) {
			isActive = false;

			delete $rootScope.$storage.accessToken;
			delete $rootScope.$storage.tokenType;
			delete $rootScope.$storage.expiresIn;
			delete $rootScope.$storage.expires;
			$rootScope.$storage.$reset();
			$rootScope.$storage.isLoggedIn = isActive;

			$localStorage.$reset();
			$sessionStorage.$reset();
			DSCacheFactory.get('colorCache').removeAll();
			DSCacheFactory.get('selectedTagsCache').removeAll();
			DSCacheFactory.get('tagsCache').removeAll();
			DSCacheFactory.get('thingsCache').removeAll();
		},

		getIsActive: function() {
			return isActive;
		},

		getIsLoggedIn: function() {
			return $rootScope.$storage.isLoggedIn;
		},

		getAccessToken: function() {
			return $rootScope.$storage.accessToken || 'not a valid token';
		},

		getExpires: function() {
			return $rootScope.$storage.expires || new Date();
		},

		log: function() {
			$log.info($rootScope.$storage);
		},

	};

	provider.getAuthHeader = function() {
		return { 'Authorization': 'Bearer ' + provider.getAccessToken() };
	};

	provider.getMilisUntilExpiration = function () {
		var e = provider.getExpires();
		var milis = e.getTime() - new Date().getTime();
		return milis < 0 ? 0 : milis;
	};

	return provider;

})

/**
 * @ngdoc service
 * @name utag.auth.service:authSrvc
 * @description
 * # authSrvc
 * Service in the utag app.
 */
.factory('authSrvc', function authSrvc($http, authService, authSession, authInterceptor, Tags, Things, API_PREFIX) {
	'use strict';

	return {

		login: function(credentials, success, error) {
			return $http
				.post(API_PREFIX + 'auth/login', credentials, {
					// headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'},
					ignoreAuthModule: true, // deactivate auth module for this request because it would intercept a 401, if user enters wrong credentials.
				})
				.success(function (data, status, headers, config) {

					authSession.setOAuth2Session(data);

					// Things.cache.setMaxAge(max);
					Tags.cache.setCacheFlushInterval(authSession.getMilisUntilExpiration());
					Things.cache.setCacheFlushInterval(authSession.getMilisUntilExpiration());

					authService.loginConfirmed(data, authInterceptor.request);

					success(data, status, headers, config);
				})
				.error(function (data, status, headers, config) {
					// Erase the token if the user fails to log in
					authSession.resetOAuth2Session(data);

					// don't reject all buffered requests if user enters wrong credentials
					if (data.error !== 'invalid_credentials') {
						authService.loginCancelled(data);
					}

					// Handle login errors here
					error(data, status, headers, config);
				});
		},

		register: function(user, success, error) {
			return $http
				.post(API_PREFIX + 'auth/register', user, {
					// headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'},
				})
				.success(function (data, status, headers, config) {
					authSession.setOAuth2Session(data);
					authService.loginConfirmed(data, authInterceptor.request);

					success(data, status, headers, config);
				})
				.error(function (data, status, headers, config) {
					authSession.resetOAuth2Session(data);
					authService.loginCancelled(data);

					// Handle login errors here
					error(data, status, headers, config);
				});
		},

		logout: function() {
			authSession.resetOAuth2Session();
			authService.loginCancelled();
		},

		isAuthorized: function() {
			return ;
		},

		isAuthenticated: function() {
			// return new Date().getTime() > authSession.getExpires().getTime();
			return authSession.getIsActive();
		},

	};
})

/**
 * @ngdoc service
 * @name utag.auth.service:authInterceptor
 * @description
 * # authInterceptor
 * Service in the utag app.
 */
// https://docs.angularjs.org/api/ng/service/$http Interceptors
// register the interceptor as a service
.factory('authInterceptor', function authInterceptor($q, authSession) {
	'use strict';

	return {
		// optional method
		'request': function(config) {
			// do something on success

			var header = authSession.getAuthHeader();
			for (var key in header) {
				config.headers[key] = header[key];
			}

			return config;
		},

		// // optional method
	  // 'requestError': function(rejection) {
		// 	// do something on error
		// 	if (canRecover(rejection)) {
		// 		return responseOrNewPromise
		// 	}
		// 	return $q.reject(rejection);
		// },



		// // optional method
		// 'response': function(response) {
		// 	// do something on success
		// 	return response;
		// },

		// // optional method
	  // 'responseError': function(rejection) {
		// 	// do something on error
		// 	if (canRecover(rejection)) {
		// 		return responseOrNewPromise
		// 	}
		// 	return $q.reject(rejection);
		// }
	};
});
