class AdvertPreviewBoxController {
}

export const AdvertPreviewBox = {
    template: require('./advert-preview-box.html'),
    bindings: {
        advert: '<',
        readOnly: '@'
    },
    controller: AdvertPreviewBoxController
};
