export class WelcomeService {
    /** @ngInject */
    constructor() {
        this.completeStatuses = [];
    }

    addWizardCompleteness(welcomeType, wizardType, resource) {
        this.completeStatuses.push({welcomeType, wizardType, resource});
    }

    updateWizardCompleteness(resource) {
        const status = this.completeStatuses.find(s => s.resource.id === resource.id);
        status.resource = resource;
    }

    getWelcomeStatuses(welcomeType) {
        const statuses = this.completeStatuses.filter(s => s.welcomeType === welcomeType);
        return _.groupBy(statuses, s => s.resource.wizardType);
    }
}
