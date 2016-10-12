class StudentStudiesController {
}

export const StudentStudies = {
    template: require('./student-studies.html'),
    bindings: {
        student: '=',
        form: '<'
    },
    controller: StudentStudiesController
};
