export class WelcomeService {
    /** @ngInject */
    constructor(authService) {
        this.authService = authService;
    }

    updateWizardCompleteness(resource, wizardType, welcomeType) {
        const wizardComplete = resource.stateComplete[wizardType];
        const completeStatuses = this.authService.getUserData('welcome') || [];
        const status = completeStatuses.find(s => s.resource.accessCode === resource.accessCode && s.wizardType === wizardType);
        if (status) {
            status.resource = WelcomeService.pickResourceFields(resource);
            status.wizardComplete = wizardComplete;
        } else if (welcomeType) {
            const status = Object.assign({resource: WelcomeService.pickResourceFields(resource)}, {
                wizardType,
                welcomeType,
                wizardComplete
            });
            completeStatuses.push(status);
        }
        this.authService.setUserData('welcome', completeStatuses);
        return status;
    }

    getWelcomeStatuses(welcomeType) {
        const completeStatuses = this.authService.getUserData('welcome') || [];
        const statuses = completeStatuses.filter(s => s.welcomeType === welcomeType);
        return _.mapValues(_.groupBy(statuses, s => s.wizardType), array => array[0]);
    }

    static pickResourceFields(resource) {
        return _.pick(resource, ['accessCode', 'name', 'state']);
    }
}
