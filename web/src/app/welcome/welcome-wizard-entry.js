class WelcomeWizardEntryController {
    $onInit() {
        this.statusClass = 'icon-close';
        if (this.resource) {
            this.statusClass = 'icon-exclamation';
            if (this.resource.completed) {
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
