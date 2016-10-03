/** @ngInject */
export class AuthService {
    constructor($http, $q, $auth, Restangular) {
        this.$http = $http;
        this.$q = $q;
        this.$auth = $auth;
        this.Restangular = Restangular;
    }

    applyAuthentication(response) {
        this.userPromise = null;
        localStorage.userToken = response.token;
        this.refreshTokenHeader();
        return this.loadUser();
    }

    refreshTokenHeader() {
        this.$http.defaults.headers.common['X-Auth-Token'] = localStorage.userToken;
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
        localStorage.userToken = null;
        this.userPromise = null;
        this.refreshTokenHeader();
    }

    resetPassword(user) {
        return this.Restangular.one('public').one('passwordTemporary').customPUT(user);
    }

    loadUser() {
        if (!this.userPromise) {
            const noToken = !localStorage.userToken;
            this.userPromise = noToken ? this.$q.when(null) :
                this.Restangular.one('user').get()
                    .then(user => {
                        this.user = user.plain();
                        return this.user;
                    }, response => {
                        if (response.status === 401) {
                            return false;
                        }
                        throw Error('Couldn\'t load user');
                    });
        }
        return this.userPromise;
    }
}
