class OrganizationController {
    $onInit() {
        this.createSteps = this.wizard.getSteps();
        this.stepSubscription = this.wizard.stepSubscribe(this._onStepChange.bind(this));
        this._onStepChange(this.wizard.getCurrentStep());
    }

    _onStepChange(currentStep) {
        if (currentStep) {
            this.organization = this.wizard.getResource();
            this.display = this.wizard.getDisplayData();
        }
    }

    $onDestroy() {
        this.stepSubscription.dispose();
    }
}

export const Organization = {
    template: require('./organization.html'),
    bindings: {
        wizard: '<',
        wizardType: '<'
    },
    controller: OrganizationController
};
