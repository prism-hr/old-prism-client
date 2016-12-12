import {AuthService} from '../../unauthenticated/auth.service';
import {UserSessionService} from '../../unauthenticated/user-session.service';

class StudentPreviewBoxController {
    /** @ngInject */
    constructor(private authService: AuthService, private userSessionService: UserSessionService) {
    }
}

export const StudentPreviewBox = {
    template: require('./student-preview-box.html'),
    bindings: {
        student: '<'
    },
    controller: StudentPreviewBoxController
};
