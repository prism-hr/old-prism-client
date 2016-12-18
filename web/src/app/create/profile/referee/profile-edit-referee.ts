import {IProfileEditRefereeService} from './profile-edit-referee-service';

class ProfileEditRefereeController {
    private refereeService: IProfileEditRefereeService;
    private referee: bf.UserRefereeRepresentation;
    private showSummary: boolean;

    /** @ngInject */
    constructor() {
    }

    $onInit() {
        this.referee = this.refereeService.getReferee();
        if (this.referee.organizationImplementationExperience) {
            this.showSummary = true;
        }
    }

    organizationChanged(complete: true) {
        this.showSummary = complete;
    }
}

export const ProfileEditReferee = {
    template: require('./profile-edit-referee.html'),
    bindings: {
        refereeService: '<',
        wizardType: '<'
    },
    controller: ProfileEditRefereeController
};
