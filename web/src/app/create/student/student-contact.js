class StudentContactController {
}

export const StudentContact = {
    template: require('./student-contact.html'),
    bindings: {
        student: '=',
        form: '<'
    },
    controller: StudentContactController
};
