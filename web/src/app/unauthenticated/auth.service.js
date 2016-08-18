function AuthService($http, $q, $auth, Restangular) {
    this.$http = $http;
    this.$q = $q;
    this.$auth = $auth;
    this.Restangular = Restangular;
}

AuthService.prototype = {
    refreshTokenHeader: function () {
        this.$http.defaults.headers.common['X-Auth-Token'] = localStorage.userToken;
    },
    authenticate: function (loginDetails) {
        var self = this;
        self.user = null;
        var authPromise;
        if (loginDetails.provider) {
            authPromise = this.$auth.authenticate(loginDetails.provider);
        } else {
            authPromise = this.Restangular.one('public').all('login').post(_.map(loginDetails, ['email', 'password']));
        }
        return authPromise
            .then(function (response) {
                localStorage.userToken = response.token;
                self.refreshTokenHeader();
                return self.loadUser();
            }, function (response) {
                console.log(response);
            });
    },
    loadUser: function () {
        var self = this;
        if (!this.userPromise) {
            this.userPromise = !localStorage.userToken ? self.$q.when(null) :
                this.Restangular.one('user').get()
                    .then(function (user) {
                        self.user = {firstName: 'Dupa'};
                        return self.user;
                    }, function (response) {
                        if (response.status === 401) {
                            return false;
                        }
                        throw Error('Couldn\'t load user');
                    });
        }
        return this.userPromise;
    }
};

module.exports = AuthService;

