class WizardHeaderController {
    $onInit() {
        this.stepSubscription = this.wizard.stepSubscribe(this._onStepChange.bind(this));
        this._onStepChange(this.wizard.getCurrentStep());
    }

    _onStepChange(currentStep) {
        if (currentStep) {
            this.display = this.wizard.getDisplayData();
        }
    }

    next() {
        this.wizard.next();
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

    view() {
    }
}

export const WizardHeader = {
    template: require('./wizard-header.html'),
    bindings: {
        wizard: '<'
    },
    controller: WizardHeaderController
};
