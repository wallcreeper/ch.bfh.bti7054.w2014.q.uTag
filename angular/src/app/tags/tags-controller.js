/**
 * Controllers of the utag.main module
 */
angular
.module('utag.tags.controller', [])

/**
 * @ngdoc function
 * @name utag.tags.controller:TagsCtrl
 * @description
 * # TagsCtrl
 * Controller of the utag app
 */
.controller('TagsCtrl', function TagsCtrl ($scope, Tags) {
  'use strict';

  $scope.tags = Tags.repo.query();

})

/**
 * @ngdoc function
 * @name utag.tags.controller:TagsDetailCtrl
 * @description
 * # TagsDetailCtrl
 * Controller of the utag app
 */
.controller('TagsDetailCtrl', function TagsDetailCtrl ($scope, Tags) {
  'use strict';

  $scope.tags = Tags.repo.query();

});
