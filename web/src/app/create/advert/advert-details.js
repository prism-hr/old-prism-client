class AdvertDetailsController {
    $onInit() {
        this.advert.advertOutsideLink = this.advert.advertOutsideLink || 'false';
    }
}

export const AdvertDetails = {
    template: require('./advert-details.html'),
    bindings: {
        form: '<',
        advert: '='
    },
    controller: AdvertDetailsController
};
