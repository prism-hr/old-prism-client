module.exports = {
    templateUrl: 'app/unauthenticated/register/employer/employer.html',
    controller: function ($scope, $timeout, $q, $log) {
        $scope.cannotFindCompany = function () {
            $scope.notFoundCompany = true;
        };
    }
};
