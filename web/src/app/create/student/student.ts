class StudentController {
    private wizard: any;
    private createSteps: any;
    private stepSubscription: any;
    private student: any;

    /** @ngInject */
    constructor(private $scope: any) {
    }

    $onInit() {
        this.createSteps = this.wizard.getSteps();
        this.stepSubscription = this.wizard.stepSubscribe(this._onStepChange.bind(this));
        this._onStepChange(this.wizard.getCurrentStep());

        this.$scope.$watch('$ctrl.studentForm', form => {
            this.wizard.setForm(form);
        });
    }

    _onStepChange(currentStep: string) {
        if (currentStep) {
            this.student = this.wizard.getResource();
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
