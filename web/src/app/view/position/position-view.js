module.exports = {
    template: require('./position-view.html'),
    /** @ngInject */
    controller: function () {
        this.selectedIndex = 0;
        this.map = {center: {latitude: 45, longitude: -73}, zoom: 8};
        this.changeTab = function (number, $event) {
            var selectedTab = angular.element($event.currentTarget);
            var lastTab = angular.element($event.currentTarget.parentElement.querySelector('.active'));
            lastTab.removeClass('active');
            selectedTab.addClass('active');
            this.selectedIndex = number;
        };
        // dummy copy for sharing
        this.dummyShare = {
            title: 'careerjet.io',
            text: 'Welcome to careerJet.io',
            url: 'careerjet.io',
            hashtags: 'careerjet.io, promoteCareerJet'
        };
    }
};
