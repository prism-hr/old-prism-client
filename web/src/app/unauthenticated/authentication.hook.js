/** @ngInject */
function authenticationHook($transitions) {
    var activationMatch = {
        to: function (state) {
            return state.data && state.data.auth;
        }
    };
    $transitions.onBefore(activationMatch, function (transition) {
        var authService = transition.injector().get('authService');
        var $state = transition.router.stateService;
        if (!authService.isAuthenticated()) {
            return $state.target('login', undefined, {location: false});
        }
    });
}

module.exports = authenticationHook;

