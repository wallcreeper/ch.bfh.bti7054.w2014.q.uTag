/**
 * @ngdoc service
 * @name utag.utils:api
 * @description
 * # api
 * Service in the utag app.
 */
angular
.module('utag.utils')
.factory('api', function api($http, $log, API_PREFIX) {
	'use strict';

	function searchTags(keywords) {
		return $http.post(API_PREFIX + 'tags/search', { 'keywords' : keywords });
	}

	function userTagsDistinct() {
		return $http.get(API_PREFIX + 'user/tags');
	}

	function searchThingsByTags(keywords) {
		return $http.post(API_PREFIX + 'things/search', { 'keywords' : keywords });
	}

	return {

		searchTags: searchTags,
		userTagsDistinct: userTagsDistinct,
		searchThingsByTags: searchThingsByTags,

	};

});
