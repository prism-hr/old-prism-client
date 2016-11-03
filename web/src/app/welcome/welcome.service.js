export class WelcomeService {
    /** @ngInject */
    constructor(authService) {
        this.authService = authService;
    }

    addWizardCompleteness(resource, params) {
        if (!params.welcomeType || !params.wizardType) {
            throw new Error('Missing params');
        }
        const completeStatuses = this.authService.getUserData('welcome') || [];
        const status = Object.assign({resource: WelcomeService.pickResourceFields(resource)}, params);
        completeStatuses.push(status);
        this.authService.setUserData('welcome', completeStatuses);
    }

    updateWizardCompleteness(resource) {
        const completeStatuses = this.authService.getUserData('welcome') || [];
        const status = completeStatuses.find(s => s.resource.accessCode === resource.accessCode);
        if (status) {
            status.resource = WelcomeService.pickResourceFields(resource);
            this.authService.setUserData('welcome', completeStatuses);
        }
        return status;
    }

    getWelcomeStatuses(welcomeType) {
        const completeStatuses = this.authService.getUserData('welcome') || [];
        const statuses = completeStatuses.filter(s => s.welcomeType === welcomeType);
        return _.mapValues(_.groupBy(statuses, s => s.wizardType), array => array[0]);
    }

    static pickResourceFields(resource) {
        return _.pick(resource, ['accessCode', 'name', 'state', 'stateComplete']);
    }
}
