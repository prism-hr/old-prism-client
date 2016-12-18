import UserRepresentation = bf.UserRepresentation;
import UserRefereeRepresentation = bf.UserRefereeRepresentation;

class ProfileRefereesController {
    private student: UserRepresentation;
    private wizard: any;
    /** @ngInject */
    constructor(private $state: ng.ui.IStateService) {
    }

    getRefereeHref(referee: UserRefereeRepresentation) {
        return this.$state.href(this.$state.current.name + '.edit', {refereeAccessCode: referee ? referee.accessCode : 'new'});
    }

    deleteReferee(referee: UserRefereeRepresentation) {
        const idx = this.student.userReferees.indexOf(referee);
        this.student.userReferees.splice(idx, 1);
        this.wizard.persist();
    }
}

export const ProfileReferees = {
    template: require('./profile-referees.html'),
    bindings: {
        wizard: '<',
        student: '=',
        form: '<'
    },
    controller: ProfileRefereesController
};
