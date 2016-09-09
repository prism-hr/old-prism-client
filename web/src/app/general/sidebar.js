module.exports = {
    template: require('./sidebar.html'),
    /** @ngInject */
    controller: function ($scope, $state, $element, $mdSidenav, AuthService) {
        this.AuthService = AuthService;
        $scope.close = function () {
            $mdSidenav('left').close();
        };
        $scope.logout = function () {
            AuthService.logout();
            $state.go('welcome');
        };
        $scope.toggleSubmenu = function (name, $event) {
            var menu = angular.element(document.body.querySelector('.submenu-' + name));
            var ele = angular.element($event.target.parentElement.parentElement);
            if (menu.hasClass('active')) {
                menu.removeClass('active');
                ele.removeClass('active');
            } else {
                menu.addClass('active');
                ele.addClass('active');
            }
        };
    }
};
