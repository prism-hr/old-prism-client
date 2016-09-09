module.exports = {
    template: require('./employer-view.html'),
    bindings: {
        tabs: '='
    },
    /** @ngInject */
    controller: function ($scope) {
        $scope.selectedIndex = 0;
        this.changeTab = function (number, $event) {
            var selectedTab = angular.element($event.currentTarget);
            var lastTab = angular.element($event.currentTarget.parentElement.querySelector('.active'));
            lastTab.removeClass('active');
            selectedTab.addClass('active');
            $scope.selectedIndex = number;
        };
    }
};