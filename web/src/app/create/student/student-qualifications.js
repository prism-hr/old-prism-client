class StudentQualificationsController {
    /** @ngInject */
    constructor(definitions) {
        this.definitions = definitions;
    }

    editQualification(qualification) {
        this.editedQualification = angular.copy(qualification);
    }

    addQualification() {
        this.editedQualification = {};
    }

    saveQualification() {
        const qualifications = this.student.userQualifications;
        const idx = qualifications.findIndex(q => q.accessCode === this.editedQualification.accessCode);
        if (idx > -1) {
            qualifications.splice(idx, 1, this.editedQualification);
        } else {
            qualifications.push(this.editedQualification);
        }
        this.editedQualification = null;
    }

    cancelQualification() {
        this.editedQualification = null;
    }
}

export const StudentQualifications = {
    template: require('./student-qualifications.html'),
    bindings: {
        wizardType: '@',
        student: '=',
        form: '<'
    },
    controller: StudentQualificationsController
};
