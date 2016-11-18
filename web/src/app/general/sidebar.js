class SidebarController {
    /** @ngInject */
    constructor($state, $mdSidenav, authService, activityService) {
        this.$state = $state;
        this.$mdSidenav = $mdSidenav;
        this.authService = authService;
        this.activityService = activityService;

        this._onActivitiesChange = function (activities) {
            if (activities.organizations) {
                this.organizations = activities.organizations;
            }
            if (activities.promotions) {
                this.promotions = activities.promotions;
            }
        };
    }

    $onInit() {
        this.hideSidebar = this.$state.current.data && this.$state.current.data.hideSidebar;
        this.stepSubscription = this.activityService.subscribeToActivities(this._onActivitiesChange.bind(this));
        this.searchBox = false;
    }

    close() {
        this.$mdSidenav('left').close();
    }

    logout() {
        this.authService.logout();
        this.$state.go('welcome');
    }
    searchBoxToggle() {
        if (this.searchBox === false) {
            this.searchBox = true;
        } else {
            this.searchBox = false;
        }
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
