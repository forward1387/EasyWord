'use strict';

// Declare app level module which depends on views, and components
angular.module('EasyWordApp', [
  'ngRoute'
]);

angular.module('EasyWordApp').config(['$routeProvider', function($routeProvider){
  $routeProvider.
      when('/home', {
        templateUrl: 'templates/home.templ.html',
        controller: 'HomeController'
      }).
      when('/words', {
        templateUrl: 'templates/words.templ.html',
        controller: 'WordsController'
      }).
      when('/units', {
        templateUrl: 'templates/units.templ.html',
        controller: 'UnitsController'
      }).
      when('/login', {
        templateUrl: 'templates/login.templ.html',
        controller: ''
      }).
      otherwise({redirectTo: '/home'});
}]);