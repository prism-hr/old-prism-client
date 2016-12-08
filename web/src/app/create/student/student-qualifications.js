class StudentQualificationsController {
    /** @ngInject */
    constructor($state) {
        this.$state = $state;
    }

    getQualificationHref(qualification) {
        return this.$state.href(this.$state.current.name + '.edit', {qualificationAccessCode: qualification ? qualification.accessCode : 'new'});
    }

    makeCurrent(qualification) {
        this.student.userQualifications.forEach(q => {
            q.current = false;
        });
        qualification.current = true;
    }

    deleteQualification(qualification) {
        const idx = this.student.userQualifications.indexOf(qualification);
        this.student.userQualifications.splice(idx, 1);
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
