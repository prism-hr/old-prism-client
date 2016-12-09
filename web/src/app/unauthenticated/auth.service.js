export class AuthService {
    /** @ngInject */
    constructor($http, $q, $auth, Restangular, userSessionService) {
        this.$http = $http;
        this.$q = $q;
        this.$auth = $auth;
        this.Restangular = Restangular;
        this.userSessionService = userSessionService;

        this.loadUser = function () {
            return this.Restangular.one('user').get()
                .then(user => {
                    this.user = user.plain();
                    this.user.stateComplete = JSON.parse(this.user.stateComplete);
                    return this.user;
                }, response => {
                    if (response.status === 401) {
                        return false;
                    }
                    throw Error('Couldn\'t load user');
                });
        };
    }

    applyAuthentication(response) {
        this.preloadUserPromise = null;
        this.setUserData('token', response.token);
        this.refreshTokenHeader();
        return this.preloadUser();
    }

    refreshTokenHeader() {
        this.tokenHeader = this.getUserData('token');
        // this.$http.defaults.headers.common['X-Auth-Token'] = this.getUserData('token');
    }

    getTokenHeader() {
        return this.tokenHeader;
    }

    register(registerDetails) {
        return this.Restangular.one('public').all('register').post(registerDetails)
            .then(response => this.applyAuthentication(response));
    }

    login(loginDetails) {
        return this.Restangular.one('public').all('login').post(loginDetails)
            .then(response => this.applyAuthentication(response));
    }

    authenticate(provider) {
        return this.$auth.authenticate(provider, {state: null})
            .then(response => response.data)
            .then(response => this.applyAuthentication(response));
    }

    logout() {
        this.user = null;
        localStorage.removeItem('userData');
        this.preloadUserPromise = null;
        this.refreshTokenHeader();
    }

    resetPassword(user) {
        return this.Restangular.one('public').one('passwordTemporary').customPUT(user);
    }

    preloadUser() {
        this.refreshTokenHeader();
        if (!this.preloadUserPromise) {
            const noToken = !this.getUserData('token');
            this.preloadUserPromise = noToken ? this.$q.when(null) :
                this.loadUser()
                    .then(() => this.userSessionService.loadUserSession())
                    .then(() => {
                        return this.user;
                    });
        }
        return this.preloadUserPromise;
    }

    getUser() {
        if (!this.preloadUserPromise) {
            console.error('preloadUserPromise is not present yet.');
        }
        return this.preloadUserPromise.then(() => this.loadUser());
    }

    getUserData(property) {
        const data = localStorage.getItem('userData');
        return data && JSON.parse(data)[property];
    }

    setUserData(property, value) {
        const data = JSON.parse(localStorage.getItem('userData') || '{}');
        data[property] = value;
        localStorage.setItem('userData', JSON.stringify(data));
    }
}
