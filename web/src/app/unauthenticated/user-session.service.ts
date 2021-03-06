import {Subject} from 'rxjs';

/** @ngInject */
export class UserSessionService {
    _userSessionSubject: Subject<any>;
    userSession: ng.IPromise<any>;
    sessionPromise: ng.IPromise<any>;

    constructor(public Restangular: Restangular.IService) {
        this._userSessionSubject = new Subject();
    }

    loadUserSession() {
        return this.Restangular.one('user', 'session').get()
            .then((userSession: any) => {
                this.userSession = userSession.plain();
                this._userSessionSubject.next(this.userSession);
                this.reloadUserSession();
            });
    }

    reloadUserSession() {
        interface ICustomHttpConfig extends angular.IRequestShortcutConfig {
            ignoreLoadingBar: boolean;
        }

        let httpConfig: ICustomHttpConfig = {ignoreLoadingBar: true};
        this.sessionPromise = this.Restangular.one('user', 'session').withHttpConfig(httpConfig).get({deferred: true}) // 304
            .then((userSession: any) => {
                if (userSession.userActivities) {
                    this.userSession = userSession.plain();
                    this._userSessionSubject.next(this.userSession);
                }
                this.reloadUserSession();
            });
    }

    searchUserSession(searchText: string) {
        return this.Restangular.one('user', 'session').get({searchText: searchText})
            .then((userSession: any) => {
                return userSession.plain();
            });
    }

    getUserSession() {
        return this.userSession;
    }

    subscribeToUserSession(observer: any) {
        return this._userSessionSubject.subscribe(observer);
    }
}
