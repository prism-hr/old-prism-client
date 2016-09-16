/** @ngInject */
module.exports = function ($transitions) {
    var activationMatch = {
        to: function (state) {
            return state.data && state.data.wizardStep;
        }
    };
    $transitions.onEnter(activationMatch, function (transition) {
        var wizard = transition.injector().get('wizard');
        var subStates = transition.to().name.split('.');
        var toStep = subStates.pop();
        var canGo = wizard.onEnter(toStep);
        if (canGo !== true) {
            var $state = transition.router.stateService;
            var stateName = subStates[0] + '.' + canGo;
            $state.go(stateName, transition.params());
        }
    });
};
