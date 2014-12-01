/**
 * @ngdoc service
 * @name utag.things:Things
 * @description
 * # Things
 * Service in the utag app.
 */
angular.module('utag.things').factory('Things', function($resource) {
  'use strict';
  return $resource('/api/v1/things/:id'); // Note the full endpoint address
});