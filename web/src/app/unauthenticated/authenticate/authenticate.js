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
            self.loading = true;
            AuthService.login(_.pick(this.user, ['username', 'password']))
                .then($mdDialog.hide)
                .finally(resetLoading);
        };

        this.register = function (form) {
            if (!form.$valid) {
                return;
            }
            self.loading = true;
            AuthService.register(this.user)
                .then($mdDialog.hide)
                .finally(resetLoading);
        };

        this.oauth = function (provider) {
            self.loading = true;
            AuthService.authenticate(provider)
                .then($mdDialog.hide)
                .finally(resetLoading);
        };

        this.resetPassword = function (form) {
            if (!form.$valid) {
                return;
            }
            self.loading = true;
            AuthService.resetPassword(self.user)
                .then(function () {
                    self.passwordReset = true;
                })
                .finally(resetLoading);
        };

        function resetLoading() {
            self.loading = false;
        }
    }
};
