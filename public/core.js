'use strict';

// Declare app level module which depends on views, and components
angular.module('easyWordApp', [
  'ngRoute', 'angularSpinner'
]);

angular.module('easyWordApp').config(['$routeProvider', function($routeProvider){
  $routeProvider.
      when('/home', {
        templateUrl: 'templates/home.templ.html',
        controller: 'HomeController'
      }).
      when('/words', {
        templateUrl: 'templates/words.templ.html',
        controller: 'WordsController'
      }).when('/words/:id/assign', {
        templateUrl: 'templates/assign.templ.html',
        controller: 'AssignController'
      }).
      when('/units', {
        templateUrl: 'templates/units.templ.html',
        controller: 'UnitsController'
      }).
      when('/login', {
        templateUrl: 'templates/login.templ.html',
        controller: ''
      }).when('/training', {
          templateUrl: 'templates/training/main.templ.html',
          controller: ''
      }).
      otherwise({redirectTo: '/home'});
}]);