class AdvertController {
    /** @ngInject */
    constructor($scope) {
        this.$scope = $scope;
    }

    $onInit() {
        this.createSteps = this.wizard.getSteps();
        this.stepSubscription = this.wizard.stepSubscribe(this._onStepChange.bind(this));
        this._onStepChange(this.wizard.getCurrentStep());

        this.$scope.$watch('$ctrl.advertForm', form => {
            this.wizard.setForm(form);
        });
    }

    _onStepChange(currentStep) {
        if (currentStep) {
            this.advert = this.wizard.getResource();
            this.display = this.wizard.getDisplayData();
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
