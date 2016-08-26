module.exports = {
    transclude: true,
    templateUrl: 'app/general/dialog/dialog.html',
    bindings: {
        title: '@'
    },
    controller: function ($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    }
};
