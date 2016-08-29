module.exports = {
    template: '<div></div>',
    bindings: {
        activity: '<'
    },
    /** @ngInject */
    controller: function ($state, $mdDialog) {
        var self = this;
        var userState = this.activity.user.state;

        var template;
        if (userState === 'UNIDENTIFIED' || userState === 'IDENTIFIED') {
            template = '<authenticate initial-view="LOGIN" activity="activity"></authenticate>';
        } else {
            template = '<authenticate initial-view="REGISTER" activity="activity"></authenticate>';
        }

        $mdDialog.show({
            template: template,
            controller: function ($scope) {
                $scope.activity = self.activity;
            },
            parent: angular.element(document.body),
            fullscreen: true
        }).then(function () {
            $state.go('activities');
        });

    }
};
