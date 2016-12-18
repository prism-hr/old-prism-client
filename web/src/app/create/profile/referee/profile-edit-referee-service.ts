import * as angular from 'angular';
import UserRepresentation = bf.UserRepresentation;
import UserRefereeRepresentation = bf.UserRefereeRepresentation;

/** @ngInject */
export const ProfileEditRefereeService = function ($state: ng.ui.IStateService) {
    class RefereeService implements IProfileEditRefereeService {
        private _referee: UserRefereeRepresentation;
        private _resource: UserRepresentation;

        constructor(private _wizard: any, refereeAccessCode: string) {
            this._resource = this._wizard.getResource();
            const originalReferee = this._resource.userReferees.find((q: any) => q.accessCode === refereeAccessCode);
            this._referee = angular.copy(originalReferee) || <UserRefereeRepresentation>{};
        }

        getReferee() {
            return this._referee;
        }

        saveReferee() {
            const referees = this._resource.userReferees;
            const idx = referees.findIndex((q: any) => q.accessCode === this._referee.accessCode);
            if (idx > -1) {
                referees.splice(idx, 1, this._referee);
            } else {
                referees.push(this._referee);
            }
            return this._wizard.persist().then(() => {
                this.goBack();
            });
        }

        cancelReferee() {
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
        create(wizard: any, refereeAccessCode: string) {
            return new RefereeService(wizard, refereeAccessCode);
        }
    };
};

export interface IProfileEditRefereeService {
    getReferee(): UserRefereeRepresentation;
    saveReferee(): ng.IPromise<any>;
    cancelReferee(): ng.IPromise<any>;
}
