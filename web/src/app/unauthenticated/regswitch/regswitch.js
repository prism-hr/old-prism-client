module.exports = {
    transclude: true,
    templateUrl: 'app/unauthenticated/regswitch/regswitch.html',
    controller: function ($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    }
};
