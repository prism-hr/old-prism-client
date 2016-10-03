class AdvertDetailsController {
    clearImage() {
        this.position.documentBackgroundImageOriginal = '';
        this.position.documentBackgroundImage = '';
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
