/**
 * directives of the utag.things module
 */
angular
.module('utag.things.directive', [])

/**
 * @ngdoc function
 * @name utag.things.directive:utagThing
 * @description
 * # utagThing
 * Controller of the utag app
 */
.directive('utagThing', function ($log) {
	'use strict';
  return {
    restrict: 'A',
    templateUrl: function(elem, attr) {
    	var type = attr.type ? '-'+attr.type : '';
    	$log.info(type);
      return '/utag/things/thing'+type+'-directive.html';
    },
    link: function(scope, elem, attrs) {
      $log.info('utag-thing directive');
    }
  };
});
