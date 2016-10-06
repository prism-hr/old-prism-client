/** @ngInject */
export const authenticationHook = function ($transitions, $mdDialog) {
    $transitions.onBefore({from: '*.**', to: '*.**'}, transition => {
        const AuthService = transition.injector().get('AuthService');
        const $state = transition.router.stateService;
        if (transition.to().name === 'invited') {
            AuthService.logout();
            return true;
        }
        return AuthService.loadUser().then(user => {
            if (user) {
                return true;
            }
            const state = transition.to().$$state();
            if (!state.data || !state.data.auth) { // no authentication required, do nothing
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
        }, data => {
            if (data.status === 401) {
                AuthService.logout();
                $state.go('welcome');
            }
        });
    });
};
