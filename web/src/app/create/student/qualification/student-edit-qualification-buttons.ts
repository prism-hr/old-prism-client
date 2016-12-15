import {IStudentEditQualificationService} from './student-edit-qualification-service';

class StudentEditQualificationButtonsController {
    private qualificationService: IStudentEditQualificationService;

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
