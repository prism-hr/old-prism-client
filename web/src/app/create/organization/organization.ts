import {Subscription} from 'rxjs';

class OrganizationController {
    wizard: any;
    createSteps: any;
    stepSubscription: Subscription;
    organization: any;

    /** @ngInject */
    constructor(private $scope: any) {
    }

    $onInit() {
        this.createSteps = this.wizard.getSteps();
        this.stepSubscription = this.wizard.stepSubscribe(this._onStepChange.bind(this));
        this._onStepChange(this.wizard.getCurrentStep());

        this.$scope.$watch('$ctrl.organizationForm', (form: ng.IFormController) => {
            this.wizard.setForm(form);
        });
    }

    _onStepChange(currentStep: string) {
        if (currentStep) {
            this.organization = this.wizard.getResource();
        }
    }

    $onDestroy() {
        this.stepSubscription.unsubscribe();
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
