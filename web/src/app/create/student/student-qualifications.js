class StudentQualificationsController {
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

export const StudentQualifications = {
    template: require('./student-qualifications.html'),
    bindings: {
        student: '=',
        form: '<'
    },
    controller: StudentQualificationsController
};
