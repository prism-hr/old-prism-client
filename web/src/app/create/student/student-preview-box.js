class StudentPreviewBoxController {
    constructor($mdDialog) {
        this.$mdDialog = $mdDialog;
    }
}

export const StudentPreviewBox = {
    template: require('./student-preview-box.html'),
    bindings: {
        student: '<'
    },
    controller: StudentPreviewBoxController
};
