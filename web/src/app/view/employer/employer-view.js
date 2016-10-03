class EmployerViewController {
    $onInit() {
        this.selectedIndex = 0;
        this.map = {center: {latitude: 45, longitude: -73}, zoom: 8};
    }

    changeTab(number, $event) {
        const selectedTab = angular.element($event.currentTarget);
        const lastTab = angular.element($event.currentTarget.parentElement.querySelector('.active'));
        lastTab.removeClass('active');
        selectedTab.addClass('active');
        this.selectedIndex = number;
    }
}

export const EmployerView = {
    template: require('./employer-view.html'),
    bindings: {
        tabs: '='
    },
    controller: EmployerViewController
};
