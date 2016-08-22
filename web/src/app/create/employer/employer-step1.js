module.exports = {
    templateUrl: 'app/create/employer/employer-step1.html',
    controller: function ($scope) {
        $scope.cannotFindCompany = function (bolean) {
            $scope.notFoundCompany = bolean;
        };
    }
};
