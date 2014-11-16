/**
 * @ngdoc function
 * @name utag.main:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the utag app
 */
angular
  .module('utag.main')
  .controller('MainCtrl', function MainCtrl ($scope, Tag, Resource) {
    'use strict';
    $scope.tags = Tag.query();
    $scope.resources = Resource.query();
  });
