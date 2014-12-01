/**
 * @ngdoc function
 * @name utag.things:ThingsCtrl
 * @description
 * # ThingsCtrl
 * Controller of the utag app
 */
// angular.module('utag.things')
//   .controller('ThingsCtrl', ['$scope', 'promise', function ThingsCtrl ($scope, promise) {
//    var self = this;

//    $scope.things = promise.data.things || [];

//    console.log(promise);
//   }]);

angular.module('utag.things')
  .controller('ThingsCtrl', ['$scope', 'Things', function ThingsCtrl ($scope, Things) {
    'use strict';
    // var self = this;

    $scope.things = Things.query();

    // function activate() {
    //  console.log('activate');
    // }

  //  activate();

  }]);
