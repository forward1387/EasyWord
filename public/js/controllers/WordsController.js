angular.module('easyWordApp').controller('WordsController', ['$scope', 'WordsDataFactory', function($scope, WordsDataFactory){
    $scope.title = "Words";

    $scope.words = [];
    $scope.newWord = {translations: ['', '', '', '', '']};

    function getInitData() {
        WordsDataFactory.list().success(function(response){
            $scope.words = response;
        });
    }
    getInitData();

    $scope.editTranslation = function(last, index){
        if(last) {
            $scope.newWord.translations.push('');
        }else {
            $scope.newWord.translations.splice(index, 1);
        }
    };
}]);