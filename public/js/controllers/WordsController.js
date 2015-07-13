angular.module('easyWordApp').controller('WordsController', ['$scope', 'WordsDataFactory', function($scope, WordsDataFactory){
    $scope.edit = true;
    $scope.words = [];
    $scope.newWord = {translations: ['']};
    $scope.checked = false;

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

    $scope.reset = function() {
        $scope.checked = true;
        $scope.newWord = {translations: ['']};
    };
}]);