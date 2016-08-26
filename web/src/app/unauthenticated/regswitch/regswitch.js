module.exports = {
    transclude: true,
    template: require('./regswitch.html'),
    /** @ngInject */
    controller: function ($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    }
};
