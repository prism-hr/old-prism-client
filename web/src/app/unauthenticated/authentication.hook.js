/** @ngInject */
function authenticationHook($transitions, $mdDialog) {
    var activationMatch = {
        to: function (state) {
            return state.data && state.data.auth;
        }
    };
    $transitions.onBefore(activationMatch, function (transition) {
        var AuthService = transition.injector().get('AuthService');
        var $state = transition.router.stateService;
        return AuthService.loadUser().then(function (user) {
            if (user) {
                return true;
            }
            return $mdDialog.show({
                template: '<authenticate initial-view="REGISTER"></authenticate>',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: true
            }).then(function () {
                $state.go(transition.to());
            });
        });
    });
}

module.exports = authenticationHook;
