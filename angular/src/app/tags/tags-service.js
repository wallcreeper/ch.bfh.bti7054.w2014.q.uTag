/**
 * @ngdoc service
 * @name utag.tag:Tags
 * @description
 * # Tags
 * Service in the utag app.
 */
angular.module('utag.tags').factory('Tags', function($resource) {
  'use strict';
  return $resource('/api/v1/tags/:id'); // Note the full endpoint address
});