'use strict';

/**
 * @ngdoc function
 * @name utagApp.controller:ResourcesCtrl
 * @description
 * # ResourcesCtrl
 * Controller of the utagApp
 */
angular.module('utagApp')
  .controller('ResourcesCtrl', ['$scope', 'promise', function ResourcesCtrl ($scope, promise) {
  	var self = this;

  	$scope.resources = promise.data.resources || [];

  	console.log(promise);
  }]);
