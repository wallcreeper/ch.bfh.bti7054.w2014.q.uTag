'use strict';

/**
 * @ngdoc function
 * @name utagApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the utagApp
 */
angular.module('utagApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
