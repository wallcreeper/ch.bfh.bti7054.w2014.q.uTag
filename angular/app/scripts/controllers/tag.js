'use strict';

/**
 * @ngdoc function
 * @name utagApp.controller:TagCtrl
 * @description
 * # TagCtrl
 * Controller of the utagApp
 */
angular.module('utagApp')
  .controller('TagCtrl', ['$scope', 'promise', function TagCtrl ($scope, promise) {
  	var self = this;

    $scope.tags = promise.data.tags || [];

    console.log(promise);

  	// function activate() {
  	// 	console.log('activate');
  	// }

	//  activate();

  }]);
