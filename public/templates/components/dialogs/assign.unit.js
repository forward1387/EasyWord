angular.module('easyWordApp').controller('ModalInstanceController', function ($scope,
                                                                              $modalInstance,
                                                                              word,
                                                                              units,
                                                                              WordsDataFactory) {

    $scope.word = word;
    $scope.units = units;

    $scope.pUnits = [];

    function initData() {
        for(var i = 0; i < $scope.units.length; i++){
            $scope.pUnits.push({ item: $scope.units[i],
                              selected: $scope.word.units.indexOf($scope.units[i]._id) > -1});
        }
    }

    initData();

    $scope.assign = function(unit){
        if(unit.selected)
            $scope.add(unit.item);
        else
            $scope.remove(unit.item);

        console.log($scope.word);
    };

    $scope.add = function(unit){
        if(!$scope.isAssigned(unit))
            $scope.word.units.push(unit._id);
    };

    $scope.remove = function(unit) {
        if($scope.isAssigned(unit))
            $scope.word.units.splice($scope.word.units.indexOf(unit._id), 1);
    };

    $scope.ok = function () {
        //
        //$modalInstance.dismiss('cancel');
        console.log(WordsDataFactory);
        WordsDataFactory.update($scope.word).success(function(response){
            console.log(response);
            $modalInstance.close(response);
        });
    };

    $scope.isAssigned = function(unit) {
        return $scope.word.units.indexOf(unit._id) > -1;
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});