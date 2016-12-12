import * as angular from 'angular';

class OrganizationPreviewBoxController {
    constructor(private $mdDialog: any) {
    }

    showBackgroundDialog(ev: any) {
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
        organization: '<',
        readOnly: '@'
    },
    controller: OrganizationPreviewBoxController
};
