class AudiencePreviewController {
}

export const AudiencePreview = {
    template: require('./audience-preview.html'),
    bindings: {
        advert: '=',
        form: '<'
    },
    controller: AudiencePreviewController
};
