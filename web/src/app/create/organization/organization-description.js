class OrganizationDescriptionController {
    clearImage() {
        this.documentBackgroundImageOriginal = null;
        this.organization.documentBackgroundImage = null;
        this.organization.pallet = '';
        this.organization.dominant = '';
    }
}

export const OrganizationDescription = {
    template: require('./organization-description.html'),
    bindings: {
        wizardType: '@',
        organization: '=',
        form: '<'
    },
    controller: OrganizationDescriptionController
};
