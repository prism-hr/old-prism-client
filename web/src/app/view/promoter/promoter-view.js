class PromoterViewController {
    $onInit() {
        this.selectedIndex = 0;
        this.map = {center: {latitude: 45, longitude: -73}, zoom: 8};
    }
}

export const PromoterView = {
    template: require('./promoter-view.html'),
    bindings: {
        promoter: '<'
    },
    controller: PromoterViewController
};
