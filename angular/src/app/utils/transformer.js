/**
 * @ngdoc service
 * @name utag.utils:transformer
 * @description
 * # transformer
 * Service in the utag app.
 */
angular
.module('utag.utils')
.factory('transformer', function transformer($http, $log, colorHash) {
	'use strict';

	function appendTransform(defaults, transform) {

		// We can't guarantee that the default transformation is an array
		defaults = angular.isArray(defaults) ? defaults : [defaults];

		// Append the new transformation to the defaults
		return defaults.concat(transform);
	};

	function transformTags(data) {

		tags = angular.isArray(data) ? data : [data];

		try {
			for (var i = 0; i < tags.length; i++) {
				tags[i].color = colorHash.hash(tags[i].name, 0.30).rgba;
				// Maybe use if color can be cached, at the moment color is always undefined from cache
				// $log.info(tags[i].color);
				// if (tags[i].color) {
				// 	$log.info('continue');
				// 	continue;
				// } else {
				// 	$log.info('hash');
				// 	tags[i].color = colorHash.hash(tags[i].name, 0.30).rgba;
				// }
			}
		}
		catch(e) {
			$log.error(e.message);
		}
		finally {
			data = tags.length === 1 ? tags[0] : tags;
		}

		return data;
	};

	function transformThings(data) {

		things = angular.isArray(data) ? data : [data];

		try {
			for (var i = 0; i < things.length; i++) {
				transformTags(things[i].tags);
			}
		}
		catch(e) {
			$log.error(e.message);
		}
		finally {
			data = things.length === 1 ? things[0] : things;
		}

		return data;
	};

	return {

		transformTags: appendTransform($http.defaults.transformResponse, transformTags),
		transformThings: appendTransform($http.defaults.transformResponse, transformThings),

	};

});
