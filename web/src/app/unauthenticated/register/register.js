module.exports = {
    templateUrl: 'app/unauthenticated/register/register.html',
    bindings: {
        activity: '<',
        onSuccess: '&'
    },
    controller: function (Restangular, $state, AuthService) {
        var self = this;
        this.user = this.activity.user;

        this.submit = function (form) {
            if (!form.$valid) {
                return;
            }
            AuthService.register(this.user)
                .then(function () {
                    self.onSuccess();
                });
        };

        this.oauth = function (provider) {
            AuthService.authenticate(provider)
                .then(function () {
                    self.onSuccess();
                });
        };
    }
};
