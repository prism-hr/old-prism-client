function AuthService(Restangular, $http, $q) {
    this.Restangular = Restangular;
    this.$http = $http;
    this.$q = $q;
}

AuthService.prototype = {
    authenticate: function (email, password) {
        var self = this;
        self.user = null;
        return this.Restangular.one('public').all('login').post({email: email, password: password})
            .then(function (response) {
                if (response.token) {
                    localStorage.userToken = response.token;
                    self.$http.defaults.headers.common['X-Auth-Token'] = response.token;
                    return self.loadUser();
                } else {
                    console.log('Failed');
                }
            });
    },
    loadUser: function () {
        var self = this;
        if (!this.userPromise) {
            this.userPromise = this.Restangular.one('user').one('activities').get()
                .then(function () {
                    self.user = {firstName: 'Dupa'};
                    return self.user;
                }, function (response) {
                    if(response.status === 401) {
                        return false;
                    }
                    throw Error('Couldn\'t load user');
                });
        }
        return this.userPromise;

    }
};

module.exports = AuthService;

