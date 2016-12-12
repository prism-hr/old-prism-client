class AudienceController {
    private createSteps: any;
    private wizard: any;
    private stepSubscription: any;
    private advert: any;
    /** @ngInject */
    constructor(private $scope: any) {
    }

    $onInit() {
        this.createSteps = this.wizard.getSteps();
        this.stepSubscription = this.wizard.stepSubscribe(this._onStepChange.bind(this));
        this._onStepChange(this.wizard.getCurrentStep());

        this.$scope.$watch('$ctrl.audienceForm', form => {
            this.wizard.setForm(form);
        });
    }

    _onStepChange(currentStep: string) {
        if (currentStep) {
            this.advert = this.wizard.getResource();
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
