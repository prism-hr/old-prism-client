class AdvertPreviewController {
}

export const AdvertPreview = {
    template: require('./advert-preview.html'),
    bindings: {
        advert: '=',
        form: '<'
    },
    controller: AdvertPreviewController
};
