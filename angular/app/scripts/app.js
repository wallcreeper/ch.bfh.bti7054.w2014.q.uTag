'use strict';

/**
 * @ngdoc overview
 * @name utagApp
 * @description
 * # utagApp
 *
 * Main module of the application.
 */
angular
  .module('utagApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'ctrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'ctrl'
      })
      .when('/tag', {
        templateUrl: 'views/tag.html',
        controller: 'TagCtrl',
        controllerAs: 'ctrl',
        resolve: {
          'promise': function (Tag) {
            return Tag.fetchAll();
          }
        }
      })
      .when('/tags', {
        templateUrl: 'views/tags.html',
        controller: 'TagsCtrl',
        controllerAs: 'ctrl',
        resolve: {
          'promise': function (Tag) {
            return Tag.fetchAll();
          }
        }
      })
      .when('/resources', {
        templateUrl: 'views/resources.html',
        controller: 'ResourcesCtrl',
        controllerAs: 'ctrl',
        resolve: {
          'promise': function (Resource) {
            return Resource.fetchAll();
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
