import {AuthService} from '../../unauthenticated/auth.service';
class StudentContactController {
    private student: any;
    private preferLocation: string;

    /** @ngInject */
    constructor(private definitions: any, private authService: AuthService) {
    }

    $onInit() {
        if (this.student.languages.length < 1) {
            this.student.languages.push({language: undefined});
        }
        this.student.proximity = this.student.proximity || 'TO_200';
        this.student.email = this.student.email || this.authService.user.username;
        this.preferLocation = this.preferLocation || 'ANY';
    }

    addLanguage(language: string) {
        const idx = this.student.languages.indexOf(language);
        this.student.languages.splice(idx + 1, 0, {language: undefined});
    }

    removeLanguage(language: string) {
        const idx = this.student.languages.indexOf(language);
        this.student.languages.splice(idx, 1);
    }
}

export const StudentContact = {
    template: require('./student-contact.html'),
    bindings: {
        wizardType: '@',
        student: '=',
        form: '<'
    },
    controller: StudentContactController
};
