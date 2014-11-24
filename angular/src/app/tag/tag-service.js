/**
 * @ngdoc service
 * @name utag.tag:Tag
 * @description
 * # Tag
 * Service in the utag app.
 */
angular.module('utag.tag').factory('Tag', function($resource) {
  'use strict';
  return $resource('/api/v1/tags/:id'); // Note the full endpoint address
});