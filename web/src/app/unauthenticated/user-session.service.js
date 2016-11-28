/** @ngInject */
export class UserSessionService {
    constructor(Restangular) {
        this.Restangular = Restangular;
        this._userSessionSubject = new Rx.Subject();
    }

    loadUserSession() {
        return this.Restangular.one('user', 'session').get()
            .then(userSession => {
                this.userSession = userSession.plain();
                this._userSessionSubject.onNext(this.userSession);
                this.reloadUserSession();
            });
    }

    reloadUserSession() {
        this.sessionPromise = this.Restangular.one('user', 'session').withHttpConfig({ignoreLoadingBar: true}).get({deferred: true}) // 304
            .then(userSession => {
                if (userSession.userActivities) {
                    this.userSession = userSession.plain();
                    this._userSessionSubject.onNext(this.userSession);
                }
                this.reloadUserSession();
            });
    }

    searchUserSession(searchText) {
        return this.Restangular.one('user', 'session').get({searchText: searchText})
            .then(userSession => {
                return userSession.plain();
            });
    }

    getUserSession() {
        return this.userSession;
    }

    subscribeToUserSession(observer) {
        return this._userSessionSubject.subscribe(observer);
    }
}
