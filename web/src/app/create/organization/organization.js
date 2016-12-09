class OrganizationController {
    /** @ngInject */
    constructor($scope, $state, Restangular, welcomeService) {
        this.$scope = $scope;
        this.$state = $state;
        this.Restangular = Restangular;
        this.welcomeService = welcomeService;
    }

    $onInit() {
        this.createSteps = this.wizard.getSteps();
        this.stepSubscription = this.wizard.stepSubscribe(this._onStepChange.bind(this));
        this._onStepChange(this.wizard.getCurrentStep());

        this.$scope.$watch('$ctrl.organizationForm', form => {
            this.wizard.setForm(form);
        });
    }

    _onStepChange(currentStep) {
        if (currentStep) {
            this.organization = this.wizard.getResource();
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
