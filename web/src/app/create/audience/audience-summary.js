class AudienceSummaryController {
}

export const AudienceSummary = {
    template: require('./audience-summary.html'),
    bindings: {
        advert: '=',
        form: '<'
    },
    controller: AudienceSummaryController
};
