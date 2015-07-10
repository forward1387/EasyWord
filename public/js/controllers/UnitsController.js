angular.module('easyWordApp').controller('UnitsController', ['$scope', 'UnitsDataFactory', function($scope, UnitsDataFactory){
    $scope.title = "Units";
    $scope.edit = true;
    $scope.units = [];

    function getInitData() {
        UnitsDataFactory.list().success(function(response) {
            $scope.units = response;
        });
    }

    getInitData();

    $scope.message = '';
    $scope.newUnit = {};

    $scope.editUnit = function(unit) {
        if(unit._id) {
            $scope.edit = false;
            $scope.newUnit = unit;
            UnitsDataFactory.update(unit).success(function(response){
                console.log(response);
            });
        } else {
            UnitsDataFactory.add(unit).success(function (response) {
                $scope.message = 'You have successfully added an Unit{id: "' + response._id + '", title: "' + response.title + '"}!';
                $scope.units.push(response);
                $scope.newUnit = {};
            });
        }
    };

    $scope.reset = function() {
        $scope.edit = true;
        $scope.newUnit = {};
    };

    $scope.deleteUnit = function(unit, index) {
        if (confirm('Are you sure you want to delete Unit{id: ' + unit._id + '} from the database?')) {
            $scope.units.splice(index, 1);
            console.log($scope.units);
            UnitsDataFactory.delete(unit).success(function (response) {
                $scope.newUnit = {};
                console.log(index);
            });
        }
    };
}]);