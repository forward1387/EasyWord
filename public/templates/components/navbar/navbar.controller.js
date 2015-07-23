angular.module('easyWordApp')
    .controller('NavbarController', ['$scope', '$location' , function ($scope, $location) {
        $scope.menu = [{
                'title': 'Home',
                'link': '/home'
            },
            {
                'title': 'Words',
                'link': '/words'
            },
            {
                'title': 'Units',
                'link': '/units'
            },
            {
                'title': 'Training',
                'link': '/training'
            }
        ];

        $scope.isActive = function(route) {
            return route === $location.path();
        };
    }]);