import {TransitionService, Transition} from 'angular-ui-router';

/** @ngInject */
export const resourceCreateWizardStepHook = function ($transitions: TransitionService) {
    const activationMatch = {
        to: (state: any) => state.data && state.data.wizardStep
    };
    $transitions.onEnter(activationMatch, (transition: Transition) => {
        transition.injector().getAsync('wizard')
            .then((wizard: any) => {
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
