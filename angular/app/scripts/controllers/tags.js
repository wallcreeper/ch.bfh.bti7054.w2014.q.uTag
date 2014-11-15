'use strict';

/**
 * @ngdoc function
 * @name utagApp.controller:TagsCtrl
 * @description
 * # TagsCtrl
 * Controller of the utagApp
 */
angular.module('utagApp')
  .controller('TagsCtrl', ['$scope', 'promise', function TagsCtrl ($scope, promise) {
  	var self = this;

  	$scope.tags = promise.data.tags || [];

  	console.log(promise);
  }]);
