import UserRepresentation = bigfoot.UserRepresentation;
import UserQualificationRepresentation = bigfoot.UserQualificationRepresentation;

class StudentQualificationsController {
    private student: UserRepresentation;
    private wizard: any;
    /** @ngInject */
    constructor(private $state: ng.ui.IStateService) {
    }

    getQualificationHref(qualification: UserQualificationRepresentation) {
        return this.$state.href(this.$state.current.name + '.edit', {qualificationAccessCode: qualification ? qualification.accessCode : 'new'});
    }

    makeCurrent(qualification: UserQualificationRepresentation) {
        this.student.userQualifications.forEach((q: any) => {
            q.current = false;
        });
        qualification.current = true;
        this.wizard.persist();
    }

    deleteQualification(qualification: UserQualificationRepresentation) {
        const idx = this.student.userQualifications.indexOf(qualification);
        this.student.userQualifications.splice(idx, 1);
        this.wizard.persist();
    }
}

export const StudentQualifications = {
    template: require('./student-qualifications.html'),
    bindings: {
        wizard: '<',
        student: '=',
        form: '<'
    },
    controller: StudentQualificationsController
};
