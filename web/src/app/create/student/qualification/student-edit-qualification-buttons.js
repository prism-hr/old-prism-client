class StudentEditQualificationButtonsController {
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
        qualificationService: '<'
    },
    controller: StudentEditQualificationButtonsController
};
