class PositionViewController {
    $onInit() {
        this.selectedIndex = 0;
        this.map = {center: {latitude: 45, longitude: -73}, zoom: 8};
        this.dummyShare = {
            title: 'careerjet.io',
            text: 'Welcome to careerJet.io',
            url: 'careerjet.io',
            hashtags: 'careerjet.io, promoteCareerJet'
        };
    }

    changeTab(number, $event) {
        const selectedTab = angular.element($event.currentTarget);
        const lastTab = angular.element($event.currentTarget.parentElement.querySelector('.active'));
        lastTab.removeClass('active');
        selectedTab.addClass('active');
        this.selectedIndex = number;
    }
}

export const PositionView = {
    template: require('./position-view.html'),
    controller: PositionViewController
};
