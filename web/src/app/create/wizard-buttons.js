class WizardButtonsController {
    next() {
        if (!this.form.$valid) {
            return;
        }

        this.form.$setPristine();
        this.wizard.next();
    }

    save() {
        if (!this.form.$valid) {
            return;
        }

        this.form.$setPristine();
        this.wizard.save();
    }

    prev() {
        this.form.$setPristine();
        this.wizard.prev();
    }

    skip() {
        this.form.$setPristine();
        this.wizard.skip();
    }
}

export const WizardButtons = {
    template: require('./wizard-buttons.html'),
    bindings: {
        wizard: '<',
        form: '<',
        loading: '<',
        display: '<'
    },
    controller: WizardButtonsController
};
