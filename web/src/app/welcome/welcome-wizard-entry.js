class WelcomeWizardEntryController {
    $onInit() {
        this.copyText = this.enabled ? 'Start' : 'Wait';
        if (this.resource) {
            this.statusClass = 'icon-exclamation';
            this.copyText = 'Continue';
            if (this.resource.state === 'ACCEPTED') {
                this.statusClass = 'icon-check';
                this.copyText = 'Edit';
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
