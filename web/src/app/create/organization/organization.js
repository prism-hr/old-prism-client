class OrganizationController {
    constructor($state, Restangular, welcomeService) {
        this.$state = $state;
        this.Restangular = Restangular;
        this.welcomeService = welcomeService;
    }

    $onInit() {
        this.newOrganization = !this.wizard.getResource().accessCode;
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
        welcomeType: '<',
        wizardType: '<'
    },
    controller: OrganizationController
};
