class AudienceSocialController {
    constructor(environment) {
        this.environment = environment;
        this.facebookAppId = environment.oauth.facebook;
    }

    $onInit() {
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

export const AudienceSocial = {
    template: require('./audience-social.html'),
    bindings: {
        advert: '=',
        form: '<'
    },
    controller: AudienceSocialController
};
