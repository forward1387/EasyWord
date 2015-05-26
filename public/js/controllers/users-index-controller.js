angular.module('UsersWrangler').controller(
    'UsersIndexController', ['$scope', 'Users', function($scope, Users){
        Users.all().success(function(data){
            $scope.users = data;
        });
    }]
);