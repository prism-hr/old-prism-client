class AudienceSummaryController {
    constructor(definitions) {
        this.definitions = definitions;
    }
    $onInit() {
        this.patternValues = this.definitions.studentPattern;
        this.selectedIndex = 0;
    }

    changeTab(number, $event) {
        const selectedTab = angular.element($event.currentTarget);
        const lastTab = angular.element($event.currentTarget.parentElement.querySelector('.active'));
        lastTab.removeClass('active');
        selectedTab.addClass('active');
        this.selectedIndex = number;
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
