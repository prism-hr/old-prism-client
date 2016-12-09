class StudentContactController {
    /** @ngInject */
    constructor(definitions, authService) {
        this.definitions = definitions;
        this.authService = authService;
    }

    $onInit() {
        if (this.student.languages.length < 1) {
            this.student.languages.push({language: undefined});
        }
        this.student.proximity = this.student.proximity || 'TO_200';
        this.student.email = this.student.email || this.authService.user.username;
    }

    addLanguage(language) {
        const idx = this.student.languages.indexOf(language);
        this.student.languages.splice(idx + 1, 0, {language: undefined});
    }

    removeLanguage(language) {
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
