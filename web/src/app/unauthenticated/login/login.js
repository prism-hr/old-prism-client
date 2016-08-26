module.exports = {
    templateUrl: 'app/unauthenticated/login/login.html',
    bindings: {
        activity: '<',
        onSuccess: '&'
    },
    controller: function (AuthService) {
        var self = this;
        this.view = 'LOGIN';
        this.activity = this.activity || {user: {}};
        this.user = angular.copy(this.activity.user) || {};

        this.setView = function (view) {
            this.view = view;
            this.user = view === 'LOGIN' ? angular.copy(this.activity.user) || {} : {};
        };

        this.login = function (form) {
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

        this.resetPassword = function (form) {
            if (!form.$valid) {
                return;
            }
            AuthService.resetPassword(self.user)
                .then(function () {
                    self.passwordReset = true;
                });
        };
    }
};
