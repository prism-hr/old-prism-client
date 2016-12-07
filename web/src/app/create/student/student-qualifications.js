class StudentQualificationsController {
    /** @ngInject */
    constructor($state) {
        this.$state = $state;
    }

    getQualificationHref(qualification) {
        return this.$state.href(this.$state.current.name + '.edit', {qualificationAccessCode: qualification.accessCode});
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
