export class MotivationCheckController {
    /** @ngInject */
    constructor(private $state: any, private $mdDialog: any) {
    }

    goto(state: string) {
        this.$mdDialog.hide()
            .then(() => {
                this.$state.go(state, {showRegistration: true});
            });
    }
}

export const MotivationCheck = {
    transclude: true,
    template: require('./motivation-check.html'),
    controller: MotivationCheckController
};
