class AdvertDetailsController {
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
