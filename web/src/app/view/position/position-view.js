module.exports = {
    template: require('./position-view.html'),
    /** @ngInject */
    controller: function ($scope) {
        $scope.selectedIndex = 0;
        $scope.map = {center: {latitude: 45, longitude: -73}, zoom: 8};
        this.changeTab = function (number, $event) {
            var selectedTab = angular.element($event.currentTarget);
            var lastTab = angular.element($event.currentTarget.parentElement.querySelector('.active'));
            lastTab.removeClass('active');
            selectedTab.addClass('active');
            $scope.selectedIndex = number;
        };
    }
};
