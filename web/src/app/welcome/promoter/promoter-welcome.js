class PromoterWelcomeController {
    /** @ngInject */
    constructor(welcomeService) {
        this.welcomeService = welcomeService;
    }

    $onInit() {
        const welcomeType = 'promoter';
        this.statuses = this.welcomeService.getWelcomeStatuses('promoter');
        const promoter = _.get(this.statuses, 'promoter.resource');
        const promoterAccessRequested = _.get(this.statuses, 'promoter.accessRequested');
        const advert = _.get(this.statuses, 'advert.resource');
        this.advertEnabled = _.get(this.statuses, 'promoter.wizardComplete.state') === 'COMPLETE' || promoterAccessRequested;
        this.audienceEnabled = _.get(this.statuses, 'advert.wizardComplete.state') === 'COMPLETE';
        this.promoterWizardState = {
            name: 'promoter.summary',
            params: {id: _.get(promoter, 'accessCode') || 'new', welcomeType}
        };
        this.advertWizardState = {
            name: 'advert.summary',
            params: {id: _.get(advert, 'accessCode') || 'new', welcomeType, organization: _.get(promoter, 'accessCode')}
        };
        this.audienceWizardState = {
            name: 'audience.summary',
            params: {id: _.get(advert, 'accessCode'), welcomeType}
        };
    }
}

export const PromoterWelcome = {
    template: require('./promoter-welcome.html'),
    controller: PromoterWelcomeController
};
