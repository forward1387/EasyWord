angular.module('easyWordApp').controller('WordsController', ['$scope', 'WordsDataFactory', function($scope, WordsDataFactory){
    $scope.edit = true;
    $scope.words = [];
    $scope.newWord = {translations: ['']};
    $scope.checked = false;

    function getInitData() {
        $scope.startSpin();
        WordsDataFactory.list().success(function(response){
            $scope.words = response;
            $scope.stopSpin();
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

    $scope.addEditWord = function(word)  {
        $scope.startSpin();
        if($scope.edit) {
            WordsDataFactory.add(word).success(function (response) {
                $scope.words.push(response);
                $scope.newWord = {translations: ['']};
                $scope.stopSpin();
            });
        }else  {
            WordsDataFactory.update(word).success(function(response){
                $scope.newWord = {translations: ['']};
                $scope.edit = true;
                $scope.checked = false;
                $scope.stopSpin();
            });
        }
    };

    $scope.reset = function() {
        $scope.checked = true;
        $scope.edit = true;
        $scope.newWord = {translations: ['']};
    };

    $scope.editWord = function(word) {
        $scope.newWord = word;
        $scope.edit = false;
        $scope.checked = true;
    };

    $scope.getSpeechPart = function(type) {
        var types = {0: "Verb", 1: "Noun", 2: "Adjective", 3: "Adverb", 4: "Pronoun",
                     5: "Preposition", 6: "Conjunction", 7: "Interjection"};
        return types[type];
    };

    $scope.deleteWord = function(word) {
        var ind = $scope.words.indexOf(word);
        if (confirm('Are you sure you want to delete Word{id: ' + word._id + ', origin: '+word.name+'} from the database?')) {
            $scope.startSpin();
            WordsDataFactory.delete(word).success(function (response) {
                $scope.words.splice(ind, 1);
                $scope.stopSpin();
            });
        }
    };

    $scope.showHideForm = function(state) {
        $scope.reset();
        if(state) {
            $scope.checked = false;
        }
    };
}]).directive('stRatio',function(){
    return {
        link:function(scope, element, attr){
            var ratio=+(attr.stRatio);

            element.css('width',ratio+'%');

        }
    };
});