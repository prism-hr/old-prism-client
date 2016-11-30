export class AuthService {
    /** @ngInject */
    constructor($http, $q, $auth, Restangular, userSessionService) {
        this.$http = $http;
        this.$q = $q;
        this.$auth = $auth;
        this.Restangular = Restangular;
        this.userSessionService = userSessionService;
    }

    applyAuthentication(response) {
        this.userPromise = null;
        this.setUserData('token', response.token);
        this.refreshTokenHeader();
        return this.loadUser();
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
        this.userPromise = null;
        this.refreshTokenHeader();
    }

    resetPassword(user) {
        return this.Restangular.one('public').one('passwordTemporary').customPUT(user);
    }

    loadUser() {
        this.refreshTokenHeader();
        if (!this.userPromise) {
            const noToken = !this.getUserData('token');
            this.userPromise = noToken ? this.$q.when(null) :
                this.Restangular.one('user').get()
                    .then(user => {
                        this.user = user.plain();
                        this.user.stateComplete = JSON.parse(this.user.stateComplete);
                        return this.user;
                    }, response => {
                        if (response.status === 401) {
                            return false;
                        }
                        throw Error('Couldn\'t load user');
                    })
                    .then(() => this.userSessionService.loadUserSession())
                    .then(() => {
                        return this.user;
                    });
        }
        return this.userPromise;
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
