/**
 * directives of the utag.tags module
 */
angular
.module('utag.tags.directive', [])

/**
 * @ngdoc function
 * @name utag.tags.directive:utagTag
 * @description
 * # utagTag
 * Controller of the utag app
 */
.directive('utagTag', function ($log, colorCache) {
	'use strict';

	function link(scope, elem, attrs) {
		scope.$watch('tag', function() {
			elem.css({backgroundColor: colorCache.get(scope.tag.name, null).rgba});
		});
	}

	return {
		restrict: 'A',
		templateUrl: '/utag/tags/tag-directive.html',
		scope: {
			// same as '=tag'
			tag: '='
		},
		link: link
	};
});
