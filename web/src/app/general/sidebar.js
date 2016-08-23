module.exports = {
    templateUrl: 'app/general/sidebar.html',
    controller: function ($scope, $mdSidenav) {
        $scope.close = function () {
            $mdSidenav('right').close()
        }
    }
};
