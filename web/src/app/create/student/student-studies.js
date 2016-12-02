class StudentStudiesController {
    /** @ngInject */
    constructor(definitions) {
        this.definitions = definitions;
    }

    $onInit() {
        this.studyList = false;
        this.studyForm = true;
    }
    fakeSave() {
        this.studyList = true;
        this.studyForm = false;
    }
    fakeMore() {
        this.studyList = false;
        this.studyForm = true;
    }
}

export const StudentStudies = {
    template: require('./student-studies.html'),
    bindings: {
        student: '=',
        form: '<'
    },
    controller: StudentStudiesController
};
