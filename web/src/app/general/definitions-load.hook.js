/** @ngInject */
export const definitionsLoadHook = function ($transitions, definitions) {
    $transitions.onBefore({from: '*.**', to: '*.**'}, () => definitions.loadDefinitions());
};
