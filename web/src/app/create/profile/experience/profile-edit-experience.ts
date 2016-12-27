import * as moment from 'moment';
import * as _ from 'lodash';
import {IProfileEditExperienceService} from './profile-edit-experience-service';

class ProfileEditExperienceController {
    private experienceService: IProfileEditExperienceService;
    private experience: bf.UserExperienceRepresentation;
    private selectedExperience: any;
    private dateStart: Date;
    private dateLeave: Date;
    private showSummary: boolean;
    private minDateAward: Date;
    private maxDateStart: Date;

    /** @ngInject */
    constructor(private $state: ng.ui.IStateService, private $stateParams: any, private Restangular: Restangular.IService, private definitions: any) {
    }

    $onInit() {
        this.experience = this.experienceService.getExperience();
        this.selectedExperience = this.experience.organizationImplementationExperience && _.pick(this.experience.organizationImplementationExperience, ['accessCode', 'name']);
        this.dateStart = this.experience.dateStart && new Date(this.experience.dateStart);
        this.dateLeave = this.experience.dateLeave && new Date(this.experience.dateLeave);
        if (this.experience.organizationImplementationExperience) {
            this.showSummary = true;
        }

        this.refreshDateAwardConstraints();
    }

    organizationChanged(complete: boolean) {
        this.showSummary = complete;
    }

    experienceSelected(experience: any) {
        experience = experience || {}; // if nothing selected
        this.experience.organizationImplementationExperience.accessCode = experience.accessCode;
        this.experience.organizationImplementationExperience.name = experience.name;
    }

    getExperiences(searchText: string) {
        const organizationAccessCode = this.experience.organizationImplementationExperience.organizationImplementation.accessCode;
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

    dateStartChanged() {
        this.experience.dateStart = moment(this.dateStart).format('YYYY-MM-DD');
        this.refreshDateAwardConstraints();
    }

    dateLeaveChanged() {
        this.experience.dateLeave = moment(this.dateLeave).format('YYYY-MM-DD');
    }

    private refreshDateAwardConstraints() {
        this.minDateAward = this.dateStart && moment(this.dateStart).add(1, 'days').toDate();
        this.maxDateStart = moment().add(1, 'days').toDate();
    }
}

export const ProfileEditExperience = {
    template: require('./profile-edit-experience.html'),
    bindings: {
        experienceService: '<',
        wizardType: '<',
        wizard: '<'
    },
    controller: ProfileEditExperienceController
};
