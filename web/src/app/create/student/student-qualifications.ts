import {StateService} from 'angular-ui-router';

class StudentQualificationsController {
    private student: any;
    /** @ngInject */
    constructor(private $state: StateService) {
    }

    getQualificationHref(qualification: any) {
        return this.$state.href(this.$state.current.name + '.edit', {qualificationAccessCode: qualification ? qualification.accessCode : 'new'});
    }

    makeCurrent(qualification: any) {
        this.student.userQualifications.forEach((q: any) => {
            q.current = false;
        });
        qualification.current = true;
    }

    deleteQualification(qualification: any) {
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
