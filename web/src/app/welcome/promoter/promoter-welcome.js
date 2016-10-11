class PromoterWelcomeController {
    /** @ngInject */
    constructor(welcomeService) {
        this.welcomeService = welcomeService;
    }

    $onInit() {
        this.statuses = this.welcomeService.getWelcomeStatuses('promoter');
        this.advertEnabled = _.get(this.statuses.PROMOTER, 'resource.statusComplete.completed');
        this.audienceEnabled = _.get(this.statuses.ADVERT, 'resource.statusComplete.completed');
    }
}

export const PromoterWelcome = {
    template: require('./promoter-welcome.html'),
    controller: PromoterWelcomeController
};
