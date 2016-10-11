class StudentPreviewController {
}

export const StudentPreview = {
    template: require('./student-preview.html'),
    bindings: {
        student: '=',
        form: '<'
    },
    controller: StudentPreviewController
};
