/**
 * @ngdoc function
 * @name utag.resource:ResourceCtrl
 * @description
 * # ResourceCtrl
 * Controller of the utag app
 */
// angular.module('utag.resource')
//   .controller('ResourceCtrl', ['$scope', 'promise', function ResourceCtrl ($scope, promise) {
//    var self = this;

//    $scope.resources = promise.data.resources || [];

//    console.log(promise);
//   }]);

angular.module('utag.resource')
  .controller('ResourceCtrl', ['$scope', 'Tag', function ResourceCtrl ($scope, Resource) {
    'use strict';
    // var self = this;

    $scope.resources = Resource.query();

    // function activate() {
    //  console.log('activate');
    // }

  //  activate();

  }]);
