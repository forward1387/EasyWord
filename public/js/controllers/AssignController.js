angular.module('easyWordApp').controller('AssignController', ['$scope', '$routeParams', 'WordsDataFactory', 'UnitsDataFactory',
    function($scope, $routeParams, WordsDataFactory, UnitsDataFactory) {
    var wordId = ($routeParams.id || "");

    function initWord() {
        WordsDataFactory.get(wordId).success(function(response){
            $scope.word = response;
        });
    }

    function initUnits() {
        UnitsDataFactory.list().success(function(response){
            $scope.units = response;
        });
    }

    initWord();
    initUnits();
}]);