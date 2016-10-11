export class WelcomeService {
    /** @ngInject */
    constructor(authService) {
        this.authService = authService;
    }

    addWizardCompleteness(welcomeType, wizardType, resource) {
        const completeStatuses = this.authService.getUserData('welcome') || [];
        completeStatuses.push({welcomeType, wizardType, resource: WelcomeService.pickResourceFields(resource)});
        this.authService.setUserData('welcome', completeStatuses);
    }

    updateWizardCompleteness(resource) {
        const completeStatuses = this.authService.getUserData('welcome') || [];
        const status = completeStatuses.find(s => s.resource.id === resource.id);
        status.resource = WelcomeService.pickResourceFields(resource);
        this.authService.setUserData('welcome', completeStatuses);
    }

    getWelcomeStatuses(welcomeType) {
        const completeStatuses = this.authService.getUserData('welcome') || [];
        const statuses = completeStatuses.filter(s => s.welcomeType === welcomeType);
        return _.mapValues(_.groupBy(statuses, s => s.wizardType), array => array[0]);
    }

    static pickResourceFields(resource) {
        return _.pick(resource, ['accessCode', 'name', 'completeState']);
    }
}
