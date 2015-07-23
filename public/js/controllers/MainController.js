angular.module('easyWordApp').controller('MainController',['$scope', 'usSpinnerService', '$rootScope',
    function($scope, usSpinnerService, $rootScope){
    $scope.startcounter = 0;
    $scope.startSpin = function() {
        if (!$scope.spinneractive) {
            usSpinnerService.spin('spinner-1');
            $scope.startcounter++;
        }
    };
angular.module('easyWordApp').controller('MainController', function($scope, $modal, $log, UnitsDataFactory){
    $scope.items = ['item1', 'item2', 'item3'];

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
}]);
    $scope.animationsEnabled = true;

    function initData(){
        UnitsDataFactory.list().success(function(response){
            $scope.units = response;
        });
    }

    initData();

    $scope.open = function (size, word) {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '../../templates/components/dialogs/assign.unit.html',
            controller: 'ModalInstanceCtrl',
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
});
