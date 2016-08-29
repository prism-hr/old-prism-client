module.exports = {
    template: require('./header.html'),
    /** @ngInject */
    controller: function ($scope, $mdDialog, $mdSidenav, $state, AuthService) {
        this.hideSidebar = $state.current.data && $state.current.data.hideSidebar;
        this.AuthService = AuthService;

        $scope.showLogin = function (ev) {
            $mdDialog.show({
                template: '<authenticate initial-view="LOGIN"></authenticate>',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true
            }).then(function () {
                $state.go('activities');
            });
        };
        $scope.showRegister = function (ev) {
            $mdDialog.show({
                template: '<regswitch></regswitch>',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true
            });
        };
        $scope.openMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        $scope.toggleActivities = buildToggler('left');
        function buildToggler(navID) {
            return function () {
                $mdSidenav(navID).toggle();
            };
        }

        $scope.logout = function () {
            AuthService.logout();
        };

        $scope.advertise = function () {
            $state.go('register');
        };

    }
};
