'use strict';

/**
 * @ngdoc function
 * @name utagApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the utagApp
 */
angular.module('utagApp')
  .controller('MainCtrl', function MainCtrl ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
