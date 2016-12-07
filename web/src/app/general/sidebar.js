class SidebarController {
    /** @ngInject */
    constructor(rx, $state, $mdSidenav, authService, userSessionService) {
        this.rx = rx;
        this.$state = $state;
        this.$mdSidenav = $mdSidenav;
        this.authService = authService;
        this.userSessionService = userSessionService;

        this._onUserSessionChange = function (userSession) {
            this.session = userSession;
        };
    }

    $onInit() {
        this.hideSidebar = this.$state.current.data && this.$state.current.data.hideSidebar;
        this.userSessionSubscription = this.userSessionService.subscribeToUserSession(this._onUserSessionChange.bind(this));
        this.searchBox = false;
    }

    $onDestroy() {
        this.userSessionSubscription.dispose();
    }

    close() {
        this.$mdSidenav('left').close();
    }

    logout() {
        this.authService.logout();
        this.$state.go('mainWelcome');
    }

    toggleSubmenu(name, $event) {
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
