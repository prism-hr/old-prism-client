class WelcomeWizardEntryController {
    $onInit() {
        this.buttonText = this.enabled ? 'Start' : 'Wait';
        if (this.wizardStatus) {
            this.statusClass = 'icon-exclamation';
            this.buttonText = 'Continue';
            if (this.wizardStatus.accessRequested) {
                this.buttonText = 'Access requested';
            } else if (this.wizardStatus.wizardComplete.state === 'COMPLETE') {
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
        wizardStatus: '<',
        enabled: '<'
    },
    controller: WelcomeWizardEntryController
};
