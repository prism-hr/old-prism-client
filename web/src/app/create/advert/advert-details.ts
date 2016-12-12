class AdvertDetailsController {
    private advertOutsideLink: boolean;

    $onInit() {
        this.advertOutsideLink = this.advertOutsideLink || false;
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
