import {Subscription} from 'rxjs';
import * as angular from 'angular';

class SidebarController {
    _onUserSessionChange: any;
    hideSidebar: boolean;
    userSessionSubscription: Subscription;

    /** @ngInject */
    constructor(private $state: any, private $mdSidenav: any, private authService: any, private userSessionService: any) {
        this._onUserSessionChange = function (userSession: any) {
            this.session = userSession;
        };
    }

    $onInit() {
        this.hideSidebar = Boolean(this.$state.current.data && this.$state.current.data.hideSidebar);
        this.userSessionSubscription = this.userSessionService.subscribeToUserSession(this._onUserSessionChange.bind(this));
    }

    $onDestroy() {
        this.userSessionSubscription.unsubscribe();
    }

    close() {
        this.$mdSidenav('left').close();
    }

    logout() {
        this.authService.logout();
        this.$state.go('mainWelcome');
    }

    getColor(str: string) {
        const color1 = str.substr(2, 7);
        return color1;
    }

    toggleSubmenu(name: string, $event: any) {
        const menu = angular.element(document.body.querySelector('.submenu-' + name));
        const ele = angular.element($event.target.parentElement.parentElement);
        if (menu.hasClass('active')) {
            menu.removeClass('active');
            ele.removeClass('active');
        } else {
            menu.addClass('active');
            ele.addClass('active');
        }
    }

}

export const Sidebar = {
    template: require('./sidebar.html'),
    controller: SidebarController
};
