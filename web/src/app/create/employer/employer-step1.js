module.exports = {
    templateUrl: 'app/create/employer/employer-step1.html',
    controller: function () {
        $scope.cannotFindCompany = function (bolean) {
            $scope.notFoundCompany = bolean;
        };
    }
};
