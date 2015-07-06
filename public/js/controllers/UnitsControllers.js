angular.module('EasyWordApp').controller('UnitsController', ['$scope', 'UnitsDataFactory', function($scope, UnitsDataFactory){
    $scope.title = "Units";

    $scope.units = [];

    function getInitData() {
        UnitsDataFactory.list().success(function(response) {
            $scope.units = response;
        });
    }

    getInitData();

    $scope.message = '';
    $scope.latestId = 2;
    $scope.newUnit = {};

    $scope.addUnit = function(unit) {
        UnitsDataFactory.add(unit).success(function(response) {
            $scope.message = 'You have successfully added an Unit{id: "'+ response._id +'", title: "' + response.title + '"}!';
            $scope.units.push(response);
            $scope.newUnit = {};
        });
    };

    $scope.reset = function() {
        $scope.newUnit = {};
    };

    $scope.deleteUnit = function(unit) {
        if (confirm('Are you sure you want to delete Unit{id: ' + unit._id + '} from the database?')) {
            UnitsDataFactory.delete(unit).success(function (response) {
                $scope.newUnit = {};
                $scope.units.shift(unit);
            });
        }
    };

    $scope.getUnit = function(unit) {
        UnitsDataFactory.get(unit._id).success(function(response) {
            console.log(response);
            $scope.newUnit = response;
        });
    };
}]);