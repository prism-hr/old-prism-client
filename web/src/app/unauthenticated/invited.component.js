class InvitedController {
    /** @ngInject */
    constructor($state, $mdDialog) {
        this.$state = $state;
        this.$mdDialog = $mdDialog;
    }

    $onInit() {
        const userState = this.activity.activity.userRole.state;

        let template;
        if (userState === 'UNIDENTIFIED' || userState === 'IDENTIFIED') {
            template = '<authenticate initial-view="LOGIN" activity="activity"></authenticate>';
        } else {
            template = '<authenticate initial-view="REGISTER" activity="activity"></authenticate>';
        }

        const activity = this.activity;
        this.$mdDialog.show({
            template,
            controller($scope) {
                $scope.activity = activity;
            },
            parent: angular.element(document.body),
            fullscreen: true
        }).then(() => {
            this.$state.go('activities');
        });
    }
}

export const Invited = {
    template: '<div></div>',
    bindings: {
        activity: '<'
    },
    controller: InvitedController
};
