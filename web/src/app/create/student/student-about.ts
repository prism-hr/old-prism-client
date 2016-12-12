class StudentAboutController {
}

export const StudentAbout = {
    template: require('./student-about.html'),
    bindings: {
        student: '=',
        form: '<'
    },
    controller: StudentAboutController
};
