class PromoterWelcomeController {
    /** @ngInject */
    constructor(welcomeService) {
        this.welcomeService = welcomeService;
    }

    $onInit() {
        const welcomeType = 'promoter';
        this.statuses = this.welcomeService.getWelcomeStatuses('promoter');
        const promoter = _.get(this.statuses, 'PROMOTER.resource');
        const advert = _.get(this.statuses, 'ADVERT.resource');
        this.advertEnabled = _.get(promoter, 'state') === 'ACCEPTED';
        this.audienceEnabled = _.get(advert, 'state') === 'ACCEPTED';
        this.promoterWizardState = {
            name: 'promoter.summary',
            params: {id: _.get(promoter, 'accessCode') || 'new', welcomeType}
        };
        this.advertWizardState = {
            name: 'advert.summary',
            params: {id: _.get(advert, 'accessCode') || 'new', welcomeType, organization: _.get(promoter, 'accessCode')}
        };
    }
}

export const PromoterWelcome = {
    template: require('./promoter-welcome.html'),
    controller: PromoterWelcomeController
};
