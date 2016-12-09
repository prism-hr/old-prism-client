class AudienceSummaryController {
    constructor(definitions, environment) {
        this.environment = environment;
        this.definitions = definitions;
        this.facebookAppId = environment.oauth.facebook;
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
