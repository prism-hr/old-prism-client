module.exports = {
    templateUrl: 'app/unauthenticated/register/register.html',
    bindings: {
        activity: '<',
        action: '@',
        accessCode: '@'
    },
    controller: function (Restangular, $state, ActivationService, AuthService) {

        this.submit = function (form) {
            if (!form.$valid) {
                return;
            }
            this.activity.action = this.action;
            ActivationService.putActivity(this.accessCode, this.activity)
                .then(function () {
                    $state.go('login');
                });
        };

        this.oauth = function (provider) {
            AuthService.authenticate({provider: provider});
        };
    }
};
