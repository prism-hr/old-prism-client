module.exports = {
    templateUrl: 'app/unauthenticated/login/login.html',
    bindings: {
        activity: '<',
        onSuccess: '&'
    },
    controller: function (AuthService) {
        var self = this;
        this.activity = this.activity || {user: {}};
        this.user = this.activity.user;

        this.submit = function (form) {
            if (!form.$valid) {
                return;
            }
            AuthService.login(_.pick(self.user, ['username', 'password']))
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
