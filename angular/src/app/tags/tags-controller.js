/**
 * @ngdoc function
 * @name utag.tags:TagsCtrl
 * @description
 * # TagsCtrl
 * Controller of the utag app
 */
// angular.module('utag.tags')
//   .controller('TagsCtrl', ['$scope', 'promise', function TagsCtrl ($scope, promise) {
//    var self = this;

//     $scope.tags = promise.data.tags || [];

//     console.log(promise);

//    // function activate() {
//    //  console.log('activate');
//    // }

//  //  activate();

//   }]);

angular.module('utag.tags')
  .controller('TagsCtrl', ['$scope', 'Tags', function TagsCtrl ($scope, Tags) {
    'use strict';
    // var self = this;

    $scope.tags = Tags.query();

    // function activate() {
    //  console.log('activate');
    // }

  //  activate();

  }])
  .controller('TagsDetailCtrl', ['$scope', 'Tags', function TagsDetailCtrl ($scope, Tags) {
    'use strict';
    // var self = this;

    $scope.tags = Tags.query();

    // function activate() {
    //  console.log('activate');
    // }

  //  activate();

  }]);
