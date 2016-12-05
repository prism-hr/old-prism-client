class AudienceController {
    /** @ngInject */
    constructor($scope) {
        this.$scope = $scope;
    }

    $onInit() {
        this.createSteps = this.wizard.getSteps();
        this.stepSubscription = this.wizard.stepSubscribe(this._onStepChange.bind(this));
        this._onStepChange(this.wizard.getCurrentStep());

        this.$scope.$watch('$ctrl.audienceForm', form => {
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

export const Audience = {
    template: require('./audience.html'),
    bindings: {
        wizard: '<'
    },
    controller: AudienceController
};
