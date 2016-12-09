class WizardButtonsController {
    $onInit() {
        this.stepSubscription = this.wizard.stepSubscribe(this._onStepChange.bind(this));
        this._onStepChange(this.wizard.getCurrentStep());
    }

    _onStepChange(currentStep) {
        if (currentStep) {
            this.display = this.wizard.getDisplayData();
        }
    }

    continue() {
        this.wizard.continue();
    }

    save() {
        this.wizard.save();
    }

    prev() {
        this.wizard.prev();
    }

    skip() {
        this.wizard.skip();
    }
}

export const WizardButtons = {
    template: require('./wizard-buttons.html'),
    bindings: {
        wizard: '<'
    },
    controller: WizardButtonsController
};
