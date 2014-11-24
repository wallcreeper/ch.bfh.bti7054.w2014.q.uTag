/**
 * @ngdoc function
 * @name utag.tag:TagCtrl
 * @description
 * # TagCtrl
 * Controller of the utag app
 */
// angular.module('utag.tag')
//   .controller('TagCtrl', ['$scope', 'promise', function TagCtrl ($scope, promise) {
//    var self = this;

//     $scope.tags = promise.data.tags || [];

//     console.log(promise);

//    // function activate() {
//    //  console.log('activate');
//    // }

//  //  activate();

//   }]);

angular.module('utag.tag')
  .controller('TagCtrl', ['$scope', 'Tag', function TagCtrl ($scope, Tag) {
    'use strict';
    // var self = this;

    $scope.tags = Tag.query();

    // function activate() {
    //  console.log('activate');
    // }

  //  activate();

  }]);
