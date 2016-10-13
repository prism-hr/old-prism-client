class WelcomeWizardEntryController {
    $onInit() {
        this.statusClass = this.enabled ? 'icon-control-play' : 'icon-close';
        if (this.resource) {
            this.statusClass = 'icon-exclamation';
            if (this.resource.state === 'ACCEPTED') {
                this.statusClass = 'icon-check';
            }
        }
    }
}

export const WelcomeWizardEntry = {
    template: require('./welcome-wizard-entry.html'),
    bindings: {
        title: '@',
        description: '@',
        wizardState: '<',
        resource: '<',
        enabled: '<'
    },
    controller: WelcomeWizardEntryController
};
