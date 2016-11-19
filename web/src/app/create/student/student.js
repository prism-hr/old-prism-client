class StudentController {
    $onInit() {
        this.createSteps = this.wizard.getSteps();
        this.stepSubscription = this.wizard.stepSubscribe(this._onStepChange.bind(this));
        this._onStepChange(this.wizard.getCurrentStep());
    }

    _onStepChange(currentStep) {
        if (currentStep) {
            this.student = this.wizard.getResource();
            this.display = this.wizard.getDisplayData();
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
