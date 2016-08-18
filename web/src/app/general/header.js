module.exports = {
    templateUrl: 'app/general/header.html',
    controller: function ($scope, $mdDialog, $state, AuthService) {
        this.hideSidebar = $state.current.data && $state.current.data.hideSidebar;
        this.AuthService = AuthService;

        $scope.showLogin = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                template: '<prism-dialog title="Log In"><login activity="activity" on-success="redirect()"></login></prism-dialog>',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: true
            });
        };
        $scope.showRegister = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/unauthenticated/register-switch/register-switch.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: true
            })
        };

        $scope.logout = function() {
            AuthService.logout();
        };

        $scope.advertise = function () {
            $state.go('register');
        };

        function DialogController($scope, $mdDialog) {
            $scope.activity = self.activity;
            $scope.redirect = function () {
                $mdDialog.cancel()
                    .then(function () {
                        $state.go('activities');
                    });
            };
        }    }
};