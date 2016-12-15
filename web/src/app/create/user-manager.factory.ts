import * as _ from 'lodash';
import UserRepresentation = bigfoot.UserRepresentation;
import {AuthService} from '../unauthenticated/auth.service';
import {IResourceManager} from './resource-manager.factory';

/** @ngInject */
export const UserManagerFactory = function ($q: ng.IQService, Restangular: Restangular.IService, authService: AuthService) {
    class UserManager implements IResourceManager {
        constructor(private _user: UserRepresentation) {
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

    function generateUserPostData(user: UserRepresentation) {
        const userPost: any = _.omit(user, ['accessCode', 'state', 'stateComplete', 'userRoles', 'email', 'organization', 'oauthProvider', 'tagsSuggested']);
        userPost.userQualifications.forEach((uq: any) => {
            uq.organizationImplementationQualification = _.omit(uq.organizationImplementationQualification, ['grades', 'tagsSuggested']);
            const q = uq.organizationImplementationQualification;
            q.organizationImplementation = _.pick(q.organizationImplementation, ['accessCode', 'name', 'organization']);
            q.organizationImplementation.organization = _.pick(q.organizationImplementation.organization, ['accessCode', 'name']);
        });
        userPost.languages.forEach((l: any) => {
            l.language = _.pick(l.language, ['accessCode']);
        });
        userPost.tags.forEach((t: any) => {
            t.tag = _.pick(t.tag, ['accessCode', 'name']);
        });
        userPost.interests.forEach((i: any) => {
            i.interest = _.pick(i.interest, ['accessCode', 'name']);
        });
        return userPost;
    }
};
