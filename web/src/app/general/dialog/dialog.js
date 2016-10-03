class DialogController {
    /** @ngInject */
    constructor($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    }
}

export const Dialog = {
    transclude: true,
    template: require('./dialog.html'),
    bindings: {
        title: '@'
    },
    controller: DialogController
};
