class AudienceController {
    $onInit() {
        this.createSteps = this.wizard.getSteps();
        this.stepSubscription = this.wizard.stepSubscribe(this._onStepChange.bind(this));
        this._onStepChange(this.wizard.getCurrentStep());
    }

    _onStepChange(currentStep) {
        if (currentStep) {
            this.advert = this.wizard.getResource();
            if (currentStep.data.preview) {
                this.showNavigation = true;
            }
            this.stepIdx = currentStep.index;
            this.nextStep = this.wizard.getNextStep();
            this.prevStep = this.wizard.getPrevStep();
        }
    }

    next(form) {
        if (!form.$valid) {
            return;
        }

        form.$setPristine();
        this.wizard.next();
    }

    prev(form) {
        form.$setPristine();
        this.wizard.prev();
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
