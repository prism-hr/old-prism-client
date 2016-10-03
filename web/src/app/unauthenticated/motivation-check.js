export class MotivationCheckController {
    /** @ngInject */
    constructor($state, $mdDialog) {
        this.$state = $state;
        this.$mdDialog = $mdDialog;
    }

    goto(state) {
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
