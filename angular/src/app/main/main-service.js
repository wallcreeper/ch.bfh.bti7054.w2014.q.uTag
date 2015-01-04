/**
 * Services of the utag.main module
 */
angular
.module('utag.main.service', [
	'angular-data.DSCacheFactory',
])

/**
 * @ngdoc service
 * @name utag.utils:selectedTagsCache
 * @description
 * # selectedTagsCache
 * Service in the utag app.
 */
.factory('selectedTagsCache', function selectedTagsCache($log, DSCacheFactory) {
	'use strict';

	var cache = new DSCacheFactory('selectedTagsCache', {

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

	function push(tag) {
		return cache.put(tag.id, tag);
	}

	function pop(tag) {
		return cache.remove(tag.id);
	}

	function all() {
		var tags = [];
		for (var key in cache.keySet()) {
			tags.push(cache.get(key));
		}
		return tags;
	}

	function clear() {
		cache.removeAll();
	}

	return {
		push: push,
		pop: pop,
		all: all,
		clear: clear,
	};

});
