module.exports = {
    transclude: true,
    template: require('./regswitch.html'),
    /** @ngInject */
    controller: function ($state, $mdDialog) {
        this.goto = function (state) {
            $mdDialog.hide()
                .then(function () {
                    return $mdDialog.show({
                        template: '<authenticate initial-view="REGISTER"></authenticate>',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        fullscreen: true
                    }).then(function () {
                        $state.go(state);
                    });
                });
        };
    }
};
