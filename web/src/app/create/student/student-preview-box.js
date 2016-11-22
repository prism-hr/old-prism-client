class StudentPreviewBoxController {
    /** @ngInject */
    constructor(authService, userSessionService) {
        this.authService = authService;
        this.userSessionService = userSessionService;
    }
}

export const StudentPreviewBox = {
    template: require('./student-preview-box.html'),
    bindings: {
        student: '<'
    },
    controller: StudentPreviewBoxController
};
