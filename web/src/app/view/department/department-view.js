class DepartmentViewController {
    $onInit() {
        this.selectedIndex = 0;
        this.map = {center: {latitude: 45, longitude: -73}, zoom: 8};
    }
}

export const DepartmentView = {
    template: require('./department-view.html'),
    bindings: {
        department: '<'
    },
    controller: DepartmentViewController
};
