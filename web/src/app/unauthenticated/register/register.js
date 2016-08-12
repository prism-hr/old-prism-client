module.exports = {
    templateUrl: 'app/unauthenticated/register/register.html',
    bindings: {
        activity: '<',
        action: '@',
        accessCode: '@'
    },
    controller: function (Restangular, $state, activationService) {

        this.submit = function (form) {
            if (!form.$valid) {
                return;
            }
            this.activity.action = this.action;
            activationService.putActivity(this.accessCode, this.activity)
                .then(function () {
                    $state.go('login');
                });
        }
    }
};
