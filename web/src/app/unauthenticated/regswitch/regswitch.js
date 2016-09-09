module.exports = {
    transclude: true,
    template: require('./regswitch.html'),
    /** @ngInject */
    controller: function ($state, $mdDialog) {
        this.goto = function (state) {
            $mdDialog.hide()
                .then(function () {
                    $state.go(state, {showRegistration: true});
                });
        };
    }
};
