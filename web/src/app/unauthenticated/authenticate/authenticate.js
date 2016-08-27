module.exports = {
    template: require('./authenticate.html'),
    bindings: {
        activity: '<',
        initialView: '@'
    },
    /** @ngInject */
    controller: function (AuthService, $mdDialog) {
        var self = this;

        this.setView = function (view) {
            this.view = view;
            this.user = view === 'FORGOT_PASSWORD' ? {} : angular.copy(_.get(this.activity, 'user')) || {};
        };

        this.setView(this.initialView);

        this.login = function (form) {
            if (!form.$valid) {
                return;
            }
            AuthService.login(_.pick(this.user, ['username', 'password']))
                .then($mdDialog.hide);
        };

        this.register = function (form) {
            if (!form.$valid) {
                return;
            }
            AuthService.register(this.user)
                .then($mdDialog.hide);
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
