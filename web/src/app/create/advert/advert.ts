class AdvertController {
    wizard: any;
    createSteps: any;
    stepSubscription: any;
    advert: any;

    /** @ngInject */
    constructor(public $scope: any) {
    }

    $onInit() {
        this.createSteps = this.wizard.getSteps();
        this.stepSubscription = this.wizard.stepSubscribe(this._onStepChange.bind(this));
        this._onStepChange(this.wizard.getCurrentStep());

        this.$scope.$watch('$ctrl.advertForm', form => {
            this.wizard.setForm(form);
        });
    }

    _onStepChange(currentStep: any) {
        if (currentStep) {
            this.advert = this.wizard.getResource();
        }
    }

    $onDestroy() {
        this.stepSubscription.dispose();
    }
}

export const Advert = {
    template: require('./advert.html'),
    bindings: {
        wizard: '<',
        wizardType: '<'
    },
    controller: AdvertController
};
