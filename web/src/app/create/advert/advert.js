class AdvertController {
    $onInit() {
        this.createSteps = this.wizard.getSteps();
        this.stepSubscription = this.wizard.stepSubscribe(this._onStepChange.bind(this));
    }

    _onStepChange(currentStep) {
        if (currentStep) {
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

export const Advert = {
    template: require('./advert.html'),
    bindings: {
        wizard: '<'
    },
    controller: AdvertController
};
