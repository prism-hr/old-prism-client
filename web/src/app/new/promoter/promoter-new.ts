import * as _ from 'lodash';
import {WelcomeService} from '../../welcome/welcome.service';

class PromoterNewController {
    statuses: any;
    studentsEnabled: boolean;
    promoterWizardState: any;
    advertWizardState: any;
    audienceWizardState: any;
    advertEnabled: boolean;
    audienceEnabled: boolean;

    /** @ngInject */
    constructor(private welcomeService: WelcomeService) {
    }

    $onInit() {
        const welcomeType = 'promoter';
        this.statuses = this.welcomeService.getWelcomeStatuses('promoter');
        const promoter = _.get(this.statuses, 'promoter.resource');
        const advert = _.get(this.statuses, 'advert.resource');
        this.advertEnabled = _.get(this.statuses, 'promoter.wizardComplete.state') === 'COMPLETE';
        this.audienceEnabled = _.get(this.statuses, 'advert.wizardComplete.state') === 'COMPLETE';
        this.promoterWizardState = {
            name: 'manage.promoter.summary',
            params: {id: _.get(promoter, 'accessCode') || 'new', welcomeType}
        };
        this.advertWizardState = {
            name: 'manage.advert.summary',
            params: {id: _.get(advert, 'accessCode') || 'new', welcomeType, organization: _.get(promoter, 'accessCode')}
        };
        this.audienceWizardState = {
            name: 'manage.audience.summary',
            params: {id: _.get(advert, 'accessCode'), welcomeType}
        };
    }
}

export const PromoterNew = {
    template: require('./promoter-new.html'),
    controller: PromoterNewController
};
