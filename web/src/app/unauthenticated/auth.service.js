function authService(Restangular, $http) {
    this.Restangular = Restangular;
    this.$http = $http;
}

authService.prototype = {
    authenticate: function (email, password) {
        var self = this;
        return this.Restangular.one('public').all('login').post({email: email, password: password})
                .then(function(response){
                if (response.token) {
                    localStorage.userToken = response.token;

                    self.$http.defaults.headers.common['X-Auth-Token'] = response.token;
                } else {
                    console.log('Failed');
                }
            });
    },
    isAuthenticated: function() {
        return !!localStorage.userToken;
    }


};

module.exports = authService;

