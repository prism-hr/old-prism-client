class AdvertSummaryController {
    $onInit() {
        this.advert.motivation = this.advert.motivation || 'EMPLOYER';
    }
}

export const AdvertSummary = {
    template: require('./advert-summary.html'),
    bindings: {
        advert: '=',
        form: '<'
    },
    controller: AdvertSummaryController
};
