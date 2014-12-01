/**
 * @ngdoc function
 * @name utag.main:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the utag app
 */
angular
  .module('utag.main')
  .controller('MainCtrl', function MainCtrl ($scope, Tags, Things) {
    'use strict';
    $scope.tags = Tags.query();
    $scope.things = Things.query();
  });
