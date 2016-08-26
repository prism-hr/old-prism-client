function AuthService($http, $q, $auth, Restangular) {
    this.$http = $http;
    this.$q = $q;
    this.$auth = $auth;
    this.Restangular = Restangular;
    var self = this;

    this.applyAuthentication = function (response) {
        self.userPromise = null;
        localStorage.userToken = response.token;
        self.refreshTokenHeader();
        return self.loadUser();
    };
}

AuthService.prototype = {
    refreshTokenHeader: function () {
        this.$http.defaults.headers.common['X-Auth-Token'] = localStorage.userToken;
    },
    register: function (registerDetails) {
        var self = this;
        return this.Restangular.one('public').all('register').post(registerDetails)
            .then(self.applyAuthentication);
    },
    login: function (loginDetails) {
        var self = this;
        return this.Restangular.one('public').all('login').post(loginDetails)
            .then(self.applyAuthentication);
    },
    authenticate: function (provider) {
        var self = this;
        return this.$auth.authenticate(provider, {state: null})
            .then(function (response) {
                return response.data;
            })
            .then(self.applyAuthentication);
    },
    logout: function () {
        this.user = null;
        localStorage.userToken = null;
        this.refreshTokenHeader();
    },
    resetPassword: function (user) {
        return this.Restangular.one('public').one('passwordTemporary').customPUT(user);
    },
    loadUser: function () {
        var self = this;
        if (!this.userPromise) {
            var noToken = !localStorage.userToken;
            this.userPromise = noToken ? self.$q.when(null) :
                this.Restangular.one('user').get()
                    .then(function (user) {
                        self.user = user.plain();
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

