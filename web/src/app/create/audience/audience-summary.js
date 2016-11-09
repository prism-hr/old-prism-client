class AudienceSummaryController {
    constructor(definitions) {
        this.definitions = definitions;
    }

    $onInit() {
        this.promotionAllowAccess = this.promotionAllowAccess || true;
    }
}

export const AudienceSummary = {
    template: require('./audience-summary.html'),
    bindings: {
        audience: '=',
        form: '<'
    },
    controller: AudienceSummaryController
};
