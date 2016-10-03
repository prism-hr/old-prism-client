/** @ngInject */
export const resourceCreateWizardStepHook = function ($transitions) {
    const activationMatch = {
        to: state => state.data && state.data.wizardStep
    };
    $transitions.onEnter(activationMatch, transition => {
        const wizard = transition.injector().get('wizard');
        const subStates = transition.to().name.split('.');
        const toStep = subStates.pop();
        const canGo = wizard.onEnter(toStep);
        if (canGo !== true) {
            console.warn(toStep + ' step is not available. Redirecting to ' + canGo);
            const $state = transition.router.stateService;
            const stateName = subStates[0] + '.' + canGo;
            $state.go(stateName, transition.params());
        }
    });
};
