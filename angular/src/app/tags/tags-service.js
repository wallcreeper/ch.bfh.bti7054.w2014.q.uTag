/**
 * Services of the utag.tags module
 */
angular
.module('utag.tags.service', [
	'ngResource',
	'angular-data.DSCacheFactory',
	'utag.utils',
])

/**
 * @ngdoc service
 * @name utag.tag.service:Tags
 * @description
 * # Tags
 * Service in the utag app.
 */
.factory('Tags', function($resource, DSCacheFactory, API_PREFIX) {
	'use strict';

	var cache = DSCacheFactory('TagsCache', {

		// This cache can hold 1000 items
		capacity: 1000,

		// Items added to this cache expire after specified time
		// maxAge: Number.MAX_VALUE,

		// Items will be actively deleted when they expire
		deleteOnExpire: 'passive',

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
		storageMode: 'sessionStorage',

		// Custom implementation of localStorage
		// storageImpl: mylocalStoragePolyfill,

		// If putting a promise, also put the resolved value if the promise resolves. Default: `false`.
		// storeOnResolve: false,

		// If putting a promise, also put the rejection value if the the promise rejects. Default: `false`.
		// storeOnReject: false,

	});

	var repo = $resource(API_PREFIX + 'tags/:id', {id: '@id'}, {
		'get': { method: 'GET', cache: cache },
		'query': { method: 'GET', cache: cache, isArray: true }

		/**
		 * Compute color hash, when receiving response from server.
		 * The problem is that it's called on every request to the resource, also if it's cached.
		 * This causes much overhead, because the color hash for every tag is computed on every call to the resource.
		 * Therfore this is only for reference or if method to cache the color is found.
		 * This uses the transformer util as a dependency.
		 *
		 * 'get': { method: 'GET', cache: cache, transformResponse: transformer.transformTags },
		 * 'query': { method: 'GET', cache: cache, isArray: true, transformResponse: transformer.transformTags }
		 */
	});

	return {

		cache: cache,

		repo: repo,

	};

});
