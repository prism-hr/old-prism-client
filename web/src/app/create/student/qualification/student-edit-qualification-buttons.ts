class StudentEditQualificationButtonsController {
    private qualificationService: any;

    saveQualification() {
        this.qualificationService.saveQualification();
    }

    cancelQualification() {
        this.qualificationService.cancelQualification();
    }
}

export const StudentEditQualificationButtons = {
    template: require('./student-edit-qualification-buttons.html'),
    bindings: {
        qualificationService: '<',
        wizard: '<'
    },
    controller: StudentEditQualificationButtonsController
};
