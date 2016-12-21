import UserRepresentation = bf.UserRepresentation;
import LanguageRelationRepresentation = bf.LanguageRelationRepresentation;

class StudentAboutController {
}

export const StudentAbout = {
    template: require('./student-about.html'),
    bindings: {
        student: '=',
        wizard: '<'
    },
    controller: StudentAboutController
};
