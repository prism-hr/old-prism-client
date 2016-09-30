/** @ngInject */
module.exports = function ($transitions, definitions) {
    $transitions.onBefore({from: '*.**', to: '*.**'}, function (transition) {
        return definitions.loadDefinitions();
    });
};
