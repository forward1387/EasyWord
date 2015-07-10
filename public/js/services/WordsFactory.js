angular.module('easyWordApp')
    .factory('WordsDataFactory', ['$http', function($http){
        var dataFactory = {};
        var url = '/api/words/';

        dataFactory.list = function(){
            return $http.get(url);
        };

        dataFactory.get = function(id) {
            return $http.get(url + id);
        };

        dataFactory.add = function(word) {
            return $http.post(url, word);
        };

        dataFactory.delete = function(word) {
            return $http.delete(url + word._id);
        };

        dataFactory.update = function(word) {
            return $http.put(url + word._id, word);
        };

        return dataFactory;
    }]);