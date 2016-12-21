import * as angular from 'angular';
import UserRepresentation = bf.UserRepresentation;
import UserExperienceRepresentation = bf.UserExperienceRepresentation;

/** @ngInject */
export const ProfileEditExperienceService = function ($state: ng.ui.IStateService) {
    class ExperienceService implements IProfileEditExperienceService {
        private _experience: UserExperienceRepresentation;
        private _resource: UserRepresentation;

        constructor(private _wizard: any, experienceAccessCode: string) {
            this._resource = this._wizard.getResource();
            const originalExperience = this._resource.userExperiences.find((q: any) => q.accessCode === experienceAccessCode);
            this._experience = angular.copy(originalExperience) || {current: false};
        }

        getExperience() {
            return this._experience;
        }

        saveExperience() {
            const experiences = this._resource.userExperiences;
            const idx = experiences.findIndex((q: any) => q.accessCode === this._experience.accessCode);
            if (idx > -1) {
                experiences.splice(idx, 1, this._experience);
            } else {
                experiences.push(this._experience);
            }
            return this._wizard.persist().then(() => {
                this.goBack();
            });
        }

        cancelExperience() {
            return this.goBack();
        }

        private goBack() {
            return $state.go('^')
                .then(() => {
                    ($state as any).reload($state.current.name.replace(/.edit$/, ''));
                });
        }
    }

    return {
        create(wizard: any, experienceAccessCode: string) {
            return new ExperienceService(wizard, experienceAccessCode);
        }
    };
};

export interface IProfileEditExperienceService {
    getExperience(): UserExperienceRepresentation;
    saveExperience(): ng.IPromise<any>;
    cancelExperience(): ng.IPromise<any>;
}
