class OrganizationPreviewBoxController {
    constructor($mdDialog) {
        this.$mdDialog = $mdDialog;
    }
    showBackgroundDialog(ev) {
        this.$mdDialog.show({
            template: '<background-dialog></background-dialog>',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true
        });
    }
}

export const OrganizationPreviewBox = {
    template: require('./organization-preview-box.html'),
    bindings: {
        organization: '<'
    },
    controller: OrganizationPreviewBoxController
};
