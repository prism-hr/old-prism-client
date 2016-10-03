class OrganizationPreviewController {
}

export const OrganizationPreview = {
    template: require('./organization-preview.html'),
    bindings: {
        type: '@',
        organization: '=',
        form: '<'
    },
    controller: OrganizationPreviewController
};
