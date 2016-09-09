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
            var template = '<authenticate initial-view="LOGIN"></authenticate>';
            if (transition.params().showRegistration) {
                template = '<authenticate initial-view="REGISTER"></authenticate>';
            }
            return $mdDialog.show({
                template: template,
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
