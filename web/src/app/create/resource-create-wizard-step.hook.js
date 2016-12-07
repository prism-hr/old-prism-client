/** @ngInject */
export const resourceCreateWizardStepHook = function ($transitions) {
    const activationMatch = {
        to: state => state.data && state.data.wizardStep
    };
    $transitions.onEnter(activationMatch, transition => {
        transition.injector().getAsync('wizard')
            .then(wizard => {
                const subStates = transition.to().name.split('.');
                const toStep = subStates[2];
                const canGo = wizard.onEnter(toStep);
                if (canGo !== true) {
                    console.warn(toStep + ' step is not available. Redirecting to ' + canGo);
                    const $state = transition.router.stateService;
                    const stateName = subStates[0] + '.' + canGo;
                    $state.go(stateName, transition.params());
                }
            });
    });
};
