'use strict';

/**
 * @ngdoc service
 * @name utagApp.Resource
 * @description
 * # Resource
 * Service in the utagApp.
 */
angular.module('utagApp')
  .service('Resource', function Resource($http, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var resources = null;

    this.fetchAll = function fetchAll() {
    	return $q.when({'data': {
    		'resources': [
				{'name': 'HTML5 Boilerplate'},
				{'name': 'AngularJS'},
				{'name': 'Karma'}
		    ]}
		});

		// return $http.get('/api/v1/resources', { cache: true});
		// .
		// 	then(function (response) {
		// 		resources = response.data;
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
