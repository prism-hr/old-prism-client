/** @ngInject */
function activationHook($transitions) {
    var activationMatch = {
        to: function (state) {
            return state.name === 'register';
        }
    };
    $transitions.onEnter(activationMatch, function (transition) {
        // var activity = transition.injector().get('activity');
        // var $state = transition.router.stateService;
        // if (activity.user.state === 'VERIFIED' || activity.user.state === 'UNIDENTIFIED') {
        //     return $state.target('login', {activity: activity});
        // }
    });
}

module.exports = activationHook;

