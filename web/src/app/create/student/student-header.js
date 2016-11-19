class StudentHeaderController {
}

export const StudentHeader = {
    template: require('./student-header.html'),
    bindings: {
        student: '=',
        form: '<'
    },
    controller: StudentHeaderController
};
