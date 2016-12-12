import * as _ from 'lodash';

/** @ngInject */
export const UserManagerFactory = function ($q: ng.IQService, Restangular: Restangular.IService, authService: any) {
    class UserManager {
        constructor(private _user: any) {
        }

        getResource() {
            return this._user;
        }

        saveResource() {
            const data = generateUserPostData(this._user);

            return Restangular.one('user', 'profile')
                .customPUT(data, null, {stateComplete: this._user.stateComplete})
                .then(() => authService.getUser())
                .then(user => {
                    this._user = user;
                    return user;
                });
        }

        commitResource() {
            return $q.when(this._user);
        }
    }

    return {
        getManager() {
            return authService.getUser()
                .then(user => {
                    return new UserManager(user);
                });
        }
    };

    function generateUserPostData(user: any) {
        const userPost: any = _.omit(user, ['accessCode', 'state', 'stateComplete', 'userRoles', 'email', 'organization', 'oauthProvider', 'tagsSuggested']);
        userPost.userQualifications.forEach((uq: any) => {
            uq.organizationImplementationQualification = _.omit(uq.organizationImplementationQualification, ['grades', 'tagsSuggested']);
            const q = uq.organizationImplementationQualification;
            q.organizationImplementation = _.pick(q.organizationImplementation, ['accessCode', 'name', 'organization']);
            q.organizationImplementation.organization = _.pick(q.organizationImplementation.organization, ['accessCode', 'name']);
        });
        return userPost;
    }
};
