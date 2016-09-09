module.exports = {
    transclude: true,
    template: require('./dialog.html'),
    bindings: {
        title: '@'
    },
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
