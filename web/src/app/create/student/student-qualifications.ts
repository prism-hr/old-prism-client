import {StateService} from 'angular-ui-router';
import UserRepresentation = bigfoot.UserRepresentation;
import UserQualificationRepresentation = bigfoot.UserQualificationRepresentation;

class StudentQualificationsController {
    private student: UserRepresentation;
    /** @ngInject */
    constructor(private $state: StateService) {
    }

    getQualificationHref(qualification: UserQualificationRepresentation) {
        return this.$state.href(this.$state.current.name + '.edit', {qualificationAccessCode: qualification ? qualification.accessCode : 'new'});
    }

    makeCurrent(qualification: UserQualificationRepresentation) {
        this.student.userQualifications.forEach((q: any) => {
            q.current = false;
        });
        qualification.current = true;
    }

    deleteQualification(qualification: UserQualificationRepresentation) {
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
