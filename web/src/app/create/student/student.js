class StudentController {
    $onInit() {
        this.student = this.wizard.getResource();
        this.createSteps = this.wizard.getSteps();
        this.stepSubscription = this.wizard.stepSubscribe(this._onStepChange.bind(this));
        this._onStepChange(this.wizard.getCurrentStep());
    }

    _onStepChange(currentStep) {
        if (currentStep) {
            if (currentStep.data.preview) {
                this.showNavigation = true;
            }
            this.stepIdx = currentStep.index;
            this.nextStep = this.wizard.getNextStep();
            this.prevStep = this.wizard.getPrevStep();
            this.optional = currentStep.data.optional;
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

    skip(form) {
        form.$setPristine();
        this.wizard.skip();
    }

    $onDestroy() {
        this.stepSubscription.dispose();
    }
}

export const Student = {
    template: require('./student.html'),
    bindings: {
        wizard: '<',
        wizardType: '<'
    },
    controller: StudentController
};
