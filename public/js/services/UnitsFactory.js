angular.module('EasyWordApp')
    .factory('UnitsDataFactory', ['$http', function($http){
        var dataFactory = {};
        var url = '/api/units/';

        dataFactory.list = function(){
            return $http.get(url);
        };

        dataFactory.get = function(id) {
            return $http.get(url + '/' + id);
        };

        dataFactory.add = function(unit) {
            return $http.post(url, unit);
        };

        dataFactory.delete = function(unit) {
            return $http.delete(url + '/' + unit.id);
        };

        dataFactory.update = function(unit) {
            return $http.put(url + '/' + unit.id, unit);
        };

        return dataFactory;
    }]);