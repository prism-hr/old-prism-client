class OrganizationPreviewController {
}

export const OrganizationPreview = {
    template: require('./organization-preview.html'),
    bindings: {
        wizardType: '@',
        organization: '=',
        form: '<'
    },
    controller: OrganizationPreviewController
};
