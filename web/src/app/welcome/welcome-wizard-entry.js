class WelcomeWizardEntryController {
    $onInit() {
        this.buttonText = this.enabled ? 'Start' : 'Wait';
        if (this.resource) {
            this.statusClass = 'icon-exclamation';
            this.buttonText = 'Continue';
            if (this.accessRequested) {
                this.buttonText = 'Access requested';
            } else if (this.resource.state === 'ACCEPTED') {
                this.statusClass = 'icon-check';
                this.buttonText = 'Edit';
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
        accessRequested: '<',
        enabled: '<'
    },
    controller: WelcomeWizardEntryController
};
