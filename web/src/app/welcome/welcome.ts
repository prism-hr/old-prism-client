import * as angular from 'angular';

class WelcomeController {
    referral: any;

    /** @ngInject */
    constructor(public $location: angular.ILocationService, public $state: any, public $mdDialog: any) {
    }

    $onInit() {
        if (this.referral) {
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
                controller($scope: any) {
                    $scope.referral = referral;
                },
                parent: angular.element(document.body),
                fullscreen: true
            }).then(() => {
                this.$state.go('activities');
            }).finally(() => {
                this.$location.search('accessCode', null);
                this.$location.search('action', null);
                this.$location.search('node', null);
            });
        }
    }
}

export const Welcome = {
    template: require('./welcome.html'),
    bindings: {
        referral: '<'
    },
    controller: WelcomeController
};
