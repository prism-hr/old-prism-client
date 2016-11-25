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
        // this.sessionPromise = this.Restangular.one('user', 'session').get({deferred: true})
        //     .then(userSession => {
        //         this.userSession = userSession.plain();
        //         this._userSessionSubject.onNext(this.userSession);
        //         this.reloadUserSession();
        //     });
    }

    subscribeToUserSession(observer) {
        return this._userSessionSubject.subscribe(observer);
    }
}
