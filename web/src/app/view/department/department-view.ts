import * as angular from 'angular';

class DepartmentViewController {
    private selectedIndex: number;
    private map: any;

    $onInit() {
        this.selectedIndex = 0;
        this.map = {center: {latitude: 45, longitude: -73}, zoom: 8};
    }

    changeTab(idx: number, $event: any) {
        const selectedTab = angular.element($event.currentTarget);
        const lastTab = angular.element($event.currentTarget.parentElement.querySelector('.active'));
        lastTab.removeClass('active');
        selectedTab.addClass('active');
        this.selectedIndex = idx;
    }
}

export const DepartmentView = {
    template: require('./department-view.html'),
    bindings: {
        department: '<'
    },
    controller: DepartmentViewController
};
