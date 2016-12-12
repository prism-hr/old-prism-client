import * as _ from 'lodash';

export class WelcomeService {
    /** @ngInject */
    constructor(private authService: any) {
    }

    static pickResourceFields(resource: any) {
        return _.pick(resource, ['accessCode', 'name', 'state']);
    }

    updateWizardCompleteness(resource: any, wizardType: string, welcomeType: string, params: any) {
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
            _.assign(status, params);
            completeStatuses.push(status);
        }
        this.authService.setUserData('welcome', completeStatuses);
        return status;
    }

    getWelcomeStatuses(welcomeType: string) {
        const completeStatuses: Array<any> = this.authService.getUserData('welcome') || [];
        const statuses = completeStatuses.filter(s => s.welcomeType === welcomeType);
        return _.mapValues(_.groupBy(statuses, s => s.wizardType), array => array[0]);
    }

}
