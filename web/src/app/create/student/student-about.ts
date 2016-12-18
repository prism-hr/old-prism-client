import {AuthService} from '../../unauthenticated/auth.service';
import UserRepresentation = bf.UserRepresentation;
import LanguageRelationRepresentation = bf.LanguageRelationRepresentation;

class StudentAboutController {
    private student: UserRepresentation;
}

export const StudentAbout = {
    template: require('./student-about.html'),
    bindings: {
        student: '=',
        form: '<'
    },
    controller: StudentAboutController
};
