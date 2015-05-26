angular.module('UsersWrangler').factory('Users', ['$http', function UsersFactory($http){
    return {
        all: function(){
            return $http({method: "GET", url: "/users"});
        },
        create: function(user){
            return $http({method: "POST", url: "/users", data: user});
        }
    };
}]);