import {IProfileEditRefereeService} from './profile-edit-referee-service';
import * as restangular from 'restangular';
import * as _ from 'lodash';

class ProfileEditRefereeController {
    private refereeService: IProfileEditRefereeService;
    private referee: bf.UserRefereeRepresentation;
    private selectedExperience: any;
    private showSummary: boolean;

    /** @ngInject */
    constructor(private Restangular: restangular.IService) {
    }

    $onInit() {
        this.referee = this.refereeService.getReferee();
        this.selectedExperience = this.referee.organizationImplementationExperience && _.pick(this.referee.organizationImplementationExperience, ['accessCode', 'name']);
        if (this.referee.organizationImplementationExperience) {
            this.showSummary = true;
        }
    }

    organizationChanged(complete: true) {
        this.showSummary = complete;
    }

    experienceSelected(experience: any) {
        experience = experience || {}; // if nothing selected
        this.referee.organizationImplementationExperience.accessCode = experience.accessCode;
        this.referee.organizationImplementationExperience.name = experience.name;
    }

    getExperiences(searchText: string) {
        const organizationAccessCode = this.referee.organizationImplementationExperience.organizationImplementation.accessCode;
        if (organizationAccessCode) {
            return this.Restangular.one('organizationImplementations', organizationAccessCode)
                .all('experiences').getList({searchTerm: searchText})
                .then((experiences: Restangular.ICollection) => {
                    experiences = experiences.plain();
                    const nameTaken = _.find(experiences, {name: searchText});
                    if (searchText.length >= 2 && !nameTaken) {
                        experiences.unshift({name: searchText});
                    }
                    return experiences;
                });
        }
        return searchText.length >= 2 ? [{name: searchText}] : [];
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
