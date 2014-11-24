/**
 * @ngdoc service
 * @name utag.resource:Resource
 * @description
 * # Resource
 * Service in the utag app.
 */
angular.module('utag.resource').factory('Resource', function($resource) {
  'use strict';
  return $resource('/api/v1/resources/:id'); // Note the full endpoint address
});