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
        this.advertEnabled = promoter.state === 'ACCEPTED';
        this.audienceEnabled = advert.state === 'ACCEPTED';
        this.promoterWizardState = {
            name: 'promoter.summary',
            params: {id: _.get(promoter, 'accessCode') || 'new', welcomeType}
        };
        this.advertWizardState = {
            name: 'advert.category',
            params: {id: _.get(advert, 'accessCode') || 'new', welcomeType}
        };
    }
}

export const PromoterWelcome = {
    template: require('./promoter-welcome.html'),
    controller: PromoterWelcomeController
};
