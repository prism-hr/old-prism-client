/** @ngInject */
export const authenticationHook = function ($transitions, $mdDialog) {
    const activationMatch = {
        to: state => state.data && state.data.auth
    };
    $transitions.onBefore(activationMatch, transition => {
        const AuthService = transition.injector().get('AuthService');
        const $state = transition.router.stateService;
        if (transition.to() === 'invited') {
            AuthService.logout();
            return true;
        }
        return AuthService.loadUser().then(user => {
            if (user) {
                return true;
            }
            let template = '<authenticate initial-view="LOGIN"></authenticate>';
            if (transition.params().showRegistration) {
                template = '<authenticate initial-view="REGISTER"></authenticate>';
            }
            return $mdDialog.show({
                template,
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: true
            }).then(() => {
                $state.go(transition.to(), transition.params());
            });
        });
    });
};
