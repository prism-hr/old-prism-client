module.exports = {
    template: '<div></div>',
    bindings: {
        activity: '<'
    },
    controller: function ($state, $mdDialog) {
        var self = this;
        var userState = this.activity.user.state;
        if (userState === 'UNIDENTIFIED' || userState === 'IDENTIFIED') {
            $mdDialog.show({
                controller: DialogController,
                template: '<prism-dialog title="Log In"><login activity="activity" on-success="redirect()"></login></prism-dialog>',
                parent: angular.element(document.body),
                fullscreen: true
            });
        } else {
            $mdDialog.show({
                controller: DialogController,
                template: '<prism-dialog title="Sign Up"><register activity="activity" on-success="redirect()"></register></prism-dialog>',
                parent: angular.element(document.body),
                fullscreen: true
            });

        }

        function DialogController($scope, $mdDialog) {
            $scope.activity = self.activity;
            $scope.redirect = function () {
                $mdDialog.cancel()
                    .then(function () {
                        $state.go('activities');
                    });
            };
        }

    }
};
