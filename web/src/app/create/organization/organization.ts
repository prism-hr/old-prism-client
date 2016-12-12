import {WelcomeService} from '../../welcome/welcome.service';

class OrganizationController {
    wizard: any;
    createSteps: any;
    stepSubscription: any;
    organization: any;

    /** @ngInject */
    constructor(private $scope: any, welcomeService: WelcomeService) {
    }

    $onInit() {
        this.createSteps = this.wizard.getSteps();
        this.stepSubscription = this.wizard.stepSubscribe(this._onStepChange.bind(this));
        this._onStepChange(this.wizard.getCurrentStep());

        this.$scope.$watch('$ctrl.organizationForm', form => {
            this.wizard.setForm(form);
        });
    }

    _onStepChange(currentStep: string) {
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
