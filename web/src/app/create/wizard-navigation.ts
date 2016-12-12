class WizardNavigationController {
    wizard: any;
    steps: any;
    wizardType: string;
    stepSubscription: any;
    display: any;

    $onInit() {
        this.steps = this.wizard.getSteps().slice(0);
        this.wizardType = this.wizard.getWizardType();

        this.stepSubscription = this.wizard.stepSubscribe(this._onStepChange.bind(this));
        this._onStepChange(this.wizard.getCurrentStep());
    }

    _onStepChange(currentStep) {
        if (currentStep) {
            this.display = this.wizard.getDisplayData();
        }
    }
}

export const WizardNavigation = {
    template: require('./wizard-navigation.html'),
    bindings: {
        wizard: '<'
    },
    controller: WizardNavigationController
};
