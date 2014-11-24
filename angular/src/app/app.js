/**
 * @ngdoc overview
 * @name utag
 * @description
 * # utag
 *
 * Main module of the application.
 */
angular
  .module('utag', [
    'ngRoute',
    'ngResource',
    'utag.main',
    'utag.tag',
    'utag.resource'
  ])
  .config(function ($routeProvider) {
    'use strict';
    $routeProvider
      .when('/', {
        templateUrl: '/utag/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'ctrl'
      })
      .when('/tags', {
        templateUrl: '/utag/tag/tags.html',
        controller: 'TagCtrl',
        controllerAs: 'ctrl',
        // resolve: {
        //   'promise': function (Tag) {
        //     return Tag.query();
        //   }
        // }
      })
      .when('/tags/:id/view', {
        templateUrl: '/utag/tag/tag.html',
        controller: 'TagCtrl',
        controllerAs: 'ctrl',
        // resolve: {
        //   'promise': function (Tag) {
        //     return Tag.query();
        //   }
        // }
      })
      .when('/resources', {
        templateUrl: '/utag/resource/resources.html',
        controller: 'ResourceCtrl',
        controllerAs: 'ctrl',
        // resolve: {
        //   'promise': function (Resource) {
        //     return Resource.query();
        //   }
        // }
      })
      .when('/resources/:id/view', {
        templateUrl: '/utag/resource/resource.html',
        controller: 'ResourceCtrl',
        controllerAs: 'ctrl',
        // resolve: {
        //   'promise': function (Resource) {
        //     return Resource.query();
        //   }
        // }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
