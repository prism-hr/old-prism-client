class StudentContactController {
    /** @ngInject */
    constructor(definitions) {
        this.definitions = definitions;
    }

    $onInit() {
        if (this.student.languages.length < 1) {
            this.student.languages.push({language: {}});
        }
    }

    addLanguage(language) {
        const idx = this.student.languages.indexOf(language);
        this.student.languages.splice(idx, 0, {language: {}});
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
