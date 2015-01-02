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
    templateUrl: '/utag/things/thing-directive.html',
    link: function(scope, elem, attrs) {
      $log.info('utag-thing directive');
    }
  };
});
