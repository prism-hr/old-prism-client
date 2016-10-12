class AuthenticateController {
    /** @ngInject */
    constructor($mdDialog, authService) {
        this.$mdDialog = $mdDialog;
        this.authService = authService;
    }

    $onInit() {
        this.setView(this.initialView);
    }

    setView(view) {
        this.view = view;
        this.user = view === 'FORGOT_PASSWORD' ? {} : angular.copy(_.get(this.activity, 'user')) || {};
    }

    login(form) {
        if (!form.$valid) {
            return;
        }
        this.loading = true;
        this.authService.login(_.pick(this.user, ['username', 'password']))
            .then(this.$mdDialog.hide)
            .finally(this.resetLoading);
    }

    register(form) {
        if (!form.$valid) {
            return;
        }
        this.loading = true;
        this.authService.register(this.user)
            .then(this.$mdDialog.hide)
            .finally(this.resetLoading);
    }

    oauth(provider) {
        this.loading = true;
        this.authService.authenticate(provider)
            .then(this.$mdDialog.hide)
            .finally(this.resetLoading);
    }

    resetPassword(form) {
        if (!form.$valid) {
            return;
        }
        this.loading = true;
        this.authService.resetPassword(this.user)
            .then(function () {
                this.passwordReset = true;
            })
            .finally(this.resetLoading);
    }

    resetLoading() {
        this.loading = false;
    }
}

export const Authenticate = {
    template: require('./authenticate.html'),
    bindings: {
        activity: '<',
        initialView: '@'
    },
    controller: AuthenticateController
};
