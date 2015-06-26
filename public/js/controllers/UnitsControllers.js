angular.module('EasyWordApp').controller('UnitsController', ['$scope', 'UnitsDataFactory', function($scope, UnitsDataFactory){
    $scope.title = "Units";

    $scope.units = [];

    function getInitData() {
        UnitsDataFactory.list().success(function(response) {
            console.log(response);
            $scope.units = response;
        });
    }

    getInitData();

    $scope.message = '';
    $scope.latestId = 2;
    $scope.newUnit = {};

    $scope.addUnit = function(unit) {
        $scope.message = 'Thanks, ' + unit.title + ', we added you!';
    };

    $scope.reset = function() {
        $scope.newUnit = {};
    };
}]);