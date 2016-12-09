class StudentController {
    /** @ngInject */
    constructor($scope) {
        this.$scope = $scope;
    }

    $onInit() {
        this.createSteps = this.wizard.getSteps();
        this.stepSubscription = this.wizard.stepSubscribe(this._onStepChange.bind(this));
        this._onStepChange(this.wizard.getCurrentStep());

        this.$scope.$watch('$ctrl.studentForm', form => {
            this.wizard.setForm(form);
        });
    }

    _onStepChange(currentStep) {
        if (currentStep) {
            this.student = this.wizard.getResource();
            this.display = this.wizard.getDisplayData();
        }
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
