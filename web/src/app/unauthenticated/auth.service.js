/** @ngInject */
function authService(Restangular) {
    this.Restangular = Restangular;
}

authService.prototype = {
    login: function (email, password) {
        return this.Restangular.one('public').all('login').post({email: email, password: password})
            .then(function(response){
                if (response.token) {
                    // store username and token in local storage to keep user logged in between page refreshes
                    localStorage.currentUser = { username: username, token: response.token };

                    // add jwt token to auth header for all requests made by the $http service
                    $http.defaults.headers.common.Authorization = 'X-Auth-Token ' + response.token;

                    // execute callback with true to indicate successful login
                    callback(true);
                } else {
                    console.log('Failes')
                }
            });
    }

};

module.exports = authService;

