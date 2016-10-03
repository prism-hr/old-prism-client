class SidebarController {
    /** @ngInject */
    constructor($state, $mdSidenav, AuthService) {
        this.$state = $state;
        this.$mdSidenav = $mdSidenav;
        this.AuthService = AuthService;
    }

    $onInit() {
        this.hideSidebar = this.$state.current.data && this.$state.current.data.hideSidebar;
    }

    close() {
        this.$mdSidenav('left').close();
    }

    logout() {
        this.AuthService.logout();
        this.$state.go('welcome');
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
