import * as angular from 'angular';
import UserRepresentation = bf.UserRepresentation;
import UserQualificationRepresentation = bf.UserQualificationRepresentation;

/** @ngInject */
export const ProfileEditQualificationService = function ($state: ng.ui.IStateService, $stateParams: any) {
    class QualificationService implements IProfileEditQualificationService {
        private _qualification: UserQualificationRepresentation;
        private _resource: UserRepresentation;

        constructor(private _wizard: any, qualificationAccessCode: string) {
            this._resource = this._wizard.getResource();
            const originalQualification = this._resource.userQualifications.find((q: any) => q.accessCode === qualificationAccessCode);
            this._qualification = angular.copy(originalQualification) || <UserQualificationRepresentation>{current: false};
        }

        getQualification() {
            return this._qualification;
        }

        saveQualification() {
            const qualifications = this._resource.userQualifications;
            const idx = qualifications.findIndex((q: any) => q.accessCode === this._qualification.accessCode);
            if (idx > -1) {
                qualifications.splice(idx, 1, this._qualification);
            } else {
                qualifications.push(this._qualification);
            }
            if (this._qualification.current) {
                this._resource.userQualifications // make sure other qualifications aren't current
                    .forEach(q => {
                        if (q !== this._qualification) {
                            q.current = false;
                        }
                    });
            }
            return this._wizard.persist().then(savedResource => {
                this.goBack();
            });
        }

        cancelQualification() {
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
        create(wizard: any, qualificationAccessCode: string) {
            return new QualificationService(wizard, qualificationAccessCode);
        }
    };
};

export interface IProfileEditQualificationService {
    getQualification(): UserQualificationRepresentation;
    saveQualification(): ng.IPromise<any>;
    cancelQualification(): ng.IPromise<any>;
}
