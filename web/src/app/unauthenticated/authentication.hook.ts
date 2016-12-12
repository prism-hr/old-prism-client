import * as angular from 'angular';

/** @ngInject */
export const authenticationHook = function ($transitions: any, $mdDialog: any) {
    $transitions.onBefore({from: '*.**', to: '*.**'}, transition => {
        const authService = transition.injector().get('authService');
        const $state = transition.router.stateService;
        if (transition.to().name === 'invited') {
            authService.logout();
            return true;
        }
        return authService.preloadUser().then(user => {
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
                authService.logout();
                $state.go('mainWelcome');
            }
        });
    });
};
