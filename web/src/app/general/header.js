class HeaderController {
    /** @ngInject */
    constructor($state, $mdDialog, $mdSidenav, AuthService) {
        this.$state = $state;
        this.$mdDialog = $mdDialog;
        this.$mdSidenav = $mdSidenav;
        this.AuthService = AuthService;
    }

    $onInit() {
        this.hideSidebar = this.$state.current.data && this.$state.current.data.hideSidebar;
    }

    showLogin(ev) {
        this.$mdDialog.show({
            template: '<authenticate initial-view="LOGIN"></authenticate>',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true
        }).then(() => this.$state.go('activities'));
    }

    showRegister(ev) {
        this.$mdDialog.show({
            template: '<motivation-check></motivation-check>',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true
        });
    }

    toggleActivities() {
        this.$mdSidenav('left').toggle();
    }

    advertise() {
        this.$state.go('register');
    }
}

export const Header = {
    template: require('./header.html'),
    controller: HeaderController
};
