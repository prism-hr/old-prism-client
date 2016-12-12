import * as angular from 'angular';

class HeaderController {
    hideSidebar: boolean;

    /** @ngInject */
    constructor(private $state: any, private $mdDialog: any, private $mdSidenav: any, private authService: any) {
    }

    $onInit() {
        this.hideSidebar = Boolean(this.$state.current.data && this.$state.current.data.hideSidebar);
    }

    showLogin(ev: any) {
        this.$mdDialog.show({
            template: '<authenticate initial-view="LOGIN"></authenticate>',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true
        }).then(() => this.$state.go('activities'));
    }

    showRegister(ev: any) {
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
