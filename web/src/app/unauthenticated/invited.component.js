class InvitedController {
    /** @ngInject */
    constructor($state, $mdDialog) {
        this.$state = $state;
        this.$mdDialog = $mdDialog;
    }

    $onInit() {
        const user = this.referral.contact;

        let template;
        if (user.enabled) {
            template = '<authenticate initial-view="LOGIN" referral="referral"></authenticate>';
        } else {
            template = '<authenticate initial-view="REGISTER" referral="referral"></authenticate>';
        }

        const referral = this.referral;
        this.$mdDialog.show({
            template,
            controller($scope) {
                $scope.referral = referral;
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
        referral: '<'
    },
    controller: InvitedController
};
