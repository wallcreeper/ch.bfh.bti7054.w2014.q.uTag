/**
 * @ngdoc service
 * @name utag.utils:colorCache
 * @description
 * # colorCache
 * Service in the utag app.
 */
angular
.module('utag.utils', [
	'angular-data.DSCacheFactory',
])
.factory('colorCache', function colorCache(DSCacheFactory, colorHash) {
	'use strict';

	var cache = new DSCacheFactory('colorCache', {

		// This cache can hold 1000 items
		capacity: 1000,

		// Items added to this cache expire after specified time
		// maxAge: Number.MAX_VALUE,

		// Items will be actively deleted when they expire
		// deleteOnExpire: 'passive',

		// This callback is executed when the item specified by "key" expires.
		// At this point you could retrieve a fresh value for "key"
		// from the server and re-insert it into the cache.
		// onExpire: function (key, value) {

		// }

		// This cache will clear itself every hour
		// cacheFlushInterval: null,

		// This cache will check for expired items every...
		// recycleFreq: 1000,

		// This option disables or enables cache.
		// disabled: false,

		// This cache will sync itself with localStorage
		storageMode: 'localStorage',

		// Custom implementation of localStorage
		// storageImpl: mylocalStoragePolyfill,

		// If putting a promise, also put the resolved value if the promise resolves. Default: `false`.
		// storeOnResolve: false,

		// If putting a promise, also put the rejection value if the the promise rejects. Default: `false`.
		// storeOnReject: false,

	});

	function get(string, alpha) {
		return angular.isString(string) ? cache.get(string) || put(string, alpha) : '';
	}

	function put(string, alpha) {
		string = angular.isString(string) ? string : '';
		alpha = angular.isNumber(alpha) ? alpha : parseFloat(alpha) || 0.30;

		return cache.put(string, colorHash.hash(string, alpha));
	}

	return {

		get: get,
		put: put,

	};

});
