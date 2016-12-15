import * as _ from 'lodash';
import * as angular from 'angular';
import {StateService, TransitionPromise} from 'angular-ui-router';
import UserRepresentation = bigfoot.UserRepresentation;
import UserQualificationRepresentation = bigfoot.UserQualificationRepresentation;

/** @ngInject */
export const StudentEditQualificationService = function ($state: StateService, $stateParams: any) {
    class QualificationService implements IStudentEditQualificationService {
        private _qualification: UserQualificationRepresentation;

        constructor(private _resource: UserRepresentation, qualificationAccessCode: string) {
            const originalQualification = this._resource.userQualifications.find((q: any) => q.accessCode === qualificationAccessCode);
            this._qualification = angular.copy(originalQualification) || <UserQualificationRepresentation>{};
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
            return this.goBack();
        }

        cancelQualification() {
            return this.goBack();
        }

        private goBack() {
            return $state.go($state.current.name.replace(/.edit$/, ''), _.omit($stateParams, ['qualificationAccessCode']));
        }
    }

    return {
        create(resource: UserRepresentation, qualificationAccessCode: string) {
            return new QualificationService(resource, qualificationAccessCode);
        }
    };
};

export interface IStudentEditQualificationService {
    getQualification(): UserQualificationRepresentation;
    saveQualification(): TransitionPromise;
    cancelQualification(): TransitionPromise;
}
