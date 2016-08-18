module.exports = {
    templateUrl: 'app/general/header.html',
    controller: function ($scope, $mdDialog, $state) {
        var hideSidebar = $state.current.data.hideSidebar;
        $scope.showLogin = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/unauthenticated/login/login.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: true
            })
        };
        $scope.showSignup = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/unauthenticated/register-switch/register-switch.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: true 
            })
        };
        $scope.advertise = function () {
            $state.go('register');
        };
        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
        }
    }
};