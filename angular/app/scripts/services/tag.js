'use strict';

/**
 * @ngdoc service
 * @name utagApp.Tag
 * @description
 * # Tag
 * Service in the utagApp.
 */
angular.module('utagApp')
  .service('Tag', function Tag($http, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var tags = null;

    this.fetchAll = function fetchAll() {
    	// return $q.when([{id: 1, name: 'tagA'}, {id: 2, name: 'tagB'}]);

		return $http.get('/api/v1/tags', { cache: true});
		// .
		// 	then(function (response) {
		// 		tags = response.data;
		// 	});
		// 	success(function(data, status, headers, config) {
		// 	// this callback will be called asynchronously
		// 	// when the response is available
		// 		console.log(data);
		// 		console.log(status);
		// 		console.log(headers);
		// 		console.log(config);
		// 		return data;
		// 	}).
		// 	error(function(data, status, headers, config) {
		// 	// called asynchronously if an error occurs
		// 	// or server returns response with an error status.
		// 		console.log(data);
		// 		console.log(status);
		// 		console.log(headers);
		// 		console.log(config);
		// 	});
    };
  });
