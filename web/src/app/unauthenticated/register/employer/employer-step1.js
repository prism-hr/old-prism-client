module.exports = {
    templateUrl: 'app/unauthenticated/register/employer/employer-step1.html',
    controller: function ($scope) {
        $scope.cannotFindCompany = function (bolean) {
            $scope.notFoundCompany = bolean;
        };
    }
};
