module.exports = {
    bindings: {
        activity: '<',
        action: '@',
        returnTo: '<'
    },
    controller: function ($scope, $mdDialog) {
        $scope.status = '  ';
        $scope.customFullscreen = true;
        $scope.showLogin = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/unauthenticated/login/login.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
        };
    }
};