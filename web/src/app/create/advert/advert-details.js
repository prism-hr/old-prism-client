class AdvertDetailsController {
    clearImage() {
        this.advert.documentBackgroundImageOriginal = '';
        this.advert.documentBackgroundImage = '';
    }

    addSupportDocument(file) {
        // this.advert.supportDocuments.push(file);
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
