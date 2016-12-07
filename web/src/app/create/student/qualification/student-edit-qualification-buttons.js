class StudentEditQualificationButtonsController {
}

export const StudentEditQualificationButtons = {
    template: require('./student-edit-qualification-buttons.html'),
    bindings: {
        pristineQualification: '=',
        wizard: '<',
        wizardType: '<'
    },
    controller: StudentEditQualificationButtonsController
};
