import * as _ from 'lodash';

class AuthenticateController {
    initialView: string;
    view: string;
    responseError: string;
    referral: any;
    user: any;
    loading: boolean;
    passwordReset: boolean;

    /** @ngInject */
    constructor(private $mdDialog: any, private authService: any) {
    }

    $onInit() {
        this.setView(this.initialView);
    }

    setView(view: string) {
        this.view = view;
        this.responseError = null;
        const contact: any = _.get(this.referral, 'contact');
        const user: any = contact ? {username: contact.email, firstName: contact.firstName, lastName: contact.lastName} : {};
        const refererralAccessCode = _.get(this.referral, 'accessCode');
        if (refererralAccessCode) {
            user.activityReferral = {accessCode: refererralAccessCode};
        }
        this.user = view === 'FORGOT_PASSWORD' ? {} : user || {};
    }

    login(form: ng.IFormController) {
        if (!form.$valid) {
            return;
        }
        this.responseError = null;
        this.loading = true;
        this.authService.login(_.pick(this.user, ['username', 'password', 'activityReferral']))
            .then(this.$mdDialog.hide)
            .catch(r => this.handleError(r))
            .finally(() => this.resetLoading());
    }

    register(form: ng.IFormController) {
        if (!form.$valid) {
            return;
        }
        this.responseError = null;
        this.loading = true;
        this.authService.register(this.user)
            .then(this.$mdDialog.hide)
            .catch(r => this.handleError(r))
            .finally(() => this.resetLoading());
    }

    oauth(provider: string) {
        this.responseError = null;
        this.loading = true;
        this.authService.authenticate(provider)
            .then(this.$mdDialog.hide)
            .catch(r => this.handleError(r))
            .finally(() => this.resetLoading());
    }

    resetPassword(form: ng.IFormController) {
        if (!form.$valid) {
            return;
        }
        this.responseError = null;
        this.loading = true;
        this.authService.resetPassword(this.user)
            .then(() => {
                this.passwordReset = true;
            })
            .catch(r => this.handleError(r))
            .finally(() => this.resetLoading());
    }

    handleError(response: any) {
        this.responseError = response.data.responseState;
    }

    resetLoading() {
        this.loading = false;
    }
}

export const Authenticate = {
    template: require('./authenticate.html'),
    bindings: {
        referral: '<',
        initialView: '@'
    },
    controller: AuthenticateController
};
