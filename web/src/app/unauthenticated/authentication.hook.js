/** @ngInject */
function authenticationHook($transitions) {
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
            } else {
                return $state.target('login', undefined, {location: false});
            }
        });
    });
}

module.exports = authenticationHook;

