/** @ngInject */
export const UserManagerFactory = function ($q, Restangular, authService) {
    class UserManager {
        constructor(user) {
            this._user = user;
        }

        getResource() {
            return this._user;
        }

        saveResource() {
            const data = generateUserPostData(this._user);

            return Restangular.one('user', 'profile')
                .customPUT(data, null, {stateComplete: this._user.stateComplete})
                .then(() => {
                    return this._user;
                });
        }

        commitResource() {
            return $q.when(this._user);
        }
    }

    return {
        getManager() {
            return authService.loadUser()
                .then(user => {
                    return new UserManager(user);
                });
        }
    };

    function generateUserPostData(user) {
        const userPost = _.omit(user, ['accessCode', 'state', 'stateComplete', 'userRoles', 'tagsSuggested', 'email', 'organization', 'travelingDistance']);
        userPost.userQualifications.forEach(q => {
            q.organizationImplementation = _.pick(q.organizationImplementation, ['accessCode', 'name', 'organization']);
            q.organizationImplementation.organization = _.pick(q.organizationImplementation.organization, ['accessCode', 'name']);
        });
        return userPost;
    }
};
