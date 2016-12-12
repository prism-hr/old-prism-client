import {StateService} from 'angular-ui-router';

class WizardHeaderController {
    wizard: any;
    stepSubscription: any;
    viewHref: string;
    display: any;

    /** @ngInject */
    constructor(private $state: StateService) {
    }

    $onInit() {
        this.stepSubscription = this.wizard.stepSubscribe(this._onStepChange.bind(this));
        this._onStepChange(this.wizard.getCurrentStep());
        this.viewHref = this.$state.href('view.' + this.wizard.getWizardType(), {accessCode: this.wizard.getResource().accessCode});
    }

    _onStepChange(currentStep: string) {
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

    next() {
        this.wizard.next();
    }

    skip() {
        this.wizard.skip();
    }
}

export const WizardHeader = {
    template: require('./wizard-header.html'),
    bindings: {
        wizard: '<'
    },
    controller: WizardHeaderController
};
