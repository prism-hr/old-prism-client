class AdvertHeaderController {
    $onInit() {
        this.advert.positionType = this.advert.positionType || 'EMPLOYMENT';
        // TODO fetch location from organization
    }
}

export const AdvertHeader = {
    template: require('./advert-header.html'),
    bindings: {
        advert: '=',
        form: '<'
    },
    controller: AdvertHeaderController
};
