angular.module('EasyWordApp')
    .controller('NavbarCtrl', ['$scope', '$location' , function ($scope, $location) {
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
            }
        ];

        $scope.isActive = function(route) {
            return route === $location.path();
        };
    }]);