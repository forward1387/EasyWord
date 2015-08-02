angular.module('easyWordApp').controller('MainController',['$scope', 'usSpinnerService', '$rootScope', '$modal', '$log', 'UnitsDataFactory',
    function($scope, usSpinnerService, $rootScope, $modal, $log, UnitsDataFactory){
    function initData(){
        UnitsDataFactory.list().success(function(response){
            $scope.units = response;
        });
    }

    initData();

    $scope.startSpin = function() {
        if (!$scope.spinneractive) {
            usSpinnerService.spin('spinner-1');
        }
    };

    $scope.stopSpin = function() {
        if ($scope.spinneractive) {
            usSpinnerService.stop('spinner-1');
        }
    };
    $scope.spinneractive = false;

    $rootScope.$on('us-spinner:spin', function(event, key) {
        $scope.spinneractive = true;
    });

    $rootScope.$on('us-spinner:stop', function(event, key) {
        $scope.spinneractive = false;
    });

    $scope.animationsEnabled = true;

    $scope.open = function (size, word) {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '../../templates/components/dialogs/assign.unit.html',
            controller: 'ModalInstanceController',
            size: size,
            resolve: {
                word: function () {
                    return word;
                },

                units: function() {
                    return $scope.units;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
}]);
