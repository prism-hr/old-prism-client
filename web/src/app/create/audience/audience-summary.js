class AudienceSummaryController {
    constructor(definitions, environment) {
        this.environment = environment;
        this.definitions = definitions;
        this.facebookAppId = environment.oauth.facebook;
    }

    $onInit() {
        this.promotionAllowAccess = this.promotionAllowAccess || true;
        this.generalShareTags = 'HTML, Web Developer, JS, Angular';
        this.generalShareURL = 'bigfootjobs.com/advert/xxxxxx';
        this.generalShareSource = 'Big Foot Jobs';
        this.generalShareTitle = 'Front end developer / Juan Mingo Limited';
        this.generalShareText = 'Students investigate and experiment with the ways science and engineering knowledge shapes decision-making';
    }
}

export const AudienceSummary = {
    template: require('./audience-summary.html'),
    bindings: {
        audience: '=',
        advert: '=',
        form: '<'
    },
    controller: AudienceSummaryController
};
