/**
 * @ngdoc service
 * @name utag.utils:searcher
 * @description
 * # searcher
 * Service in the utag app.
 */
angular
.module('utag.utils')
.factory('searcher', function searcher($http, $log, API_PREFIX) {
	'use strict';

	function searchTags(keywords) {
		return $http.post(API_PREFIX + 'tags/search', { 'keywords' : keywords });
	}

	function searchThingsByTags(keywords) {
		return $http.post(API_PREFIX + 'things/search', { 'keywords' : keywords });
	}

	return {

		searchTags: searchTags,
		searchThingsByTags: searchThingsByTags,

	};

});
