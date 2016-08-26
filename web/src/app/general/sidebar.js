module.exports = {
    template: require('./sidebar.html'),
    /** @ngInject */
    controller: function ($scope, $mdSidenav, AuthService) {
        this.AuthService = AuthService;
        $scope.close = function () {
            $mdSidenav('left').close();
        };
        $scope.logout = function () {
            AuthService.logout();
        };
    }
};
