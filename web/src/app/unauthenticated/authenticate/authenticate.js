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
        const user = _.get(this.activity.activity, 'userRole.user') || this.activity.activity.user;
        this.user = view === 'FORGOT_PASSWORD' ? {} : angular.copy(user) || {};
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
            .then(() => {
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
