class WelcomeWizardEntryController {
    $onInit() {
        const resource = _.get(this.welcomeStatus, 'resource');
        this.statusClass = 'icon-close';
        if (resource) {
            this.statusClass = 'icon-exclamation';
            if (resource.completeted) {
                this.statusClass = 'icon-check';
            }
        }
        const id = resource ? resource.accessCode : 'new';
        this.stateName = this.initialState;
        this.stateParams = {id, welcomeType: this.welcomeType};
    }
}

export const WelcomeWizardEntry = {
    template: require('./welcome-wizard-entry.html'),
    bindings: {
        title: '@',
        description: '@',
        initialState: '@',
        welcomeType: '@',
        enabled: '<',
        welcomeStatus: '<'
    },
    controller: WelcomeWizardEntryController
};
