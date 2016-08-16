module.exports = {
    templateUrl: 'app/unauthenticated/login/login.html',
    bindings: {
        activity: '<',
        action: '@'
    },
    controller: function ($state, authService) {
        this.activity = this.activity || {user: {}};
        this.user = this.activity.user;

        this.submit = function (form) {
            if (!form.$valid) {
                return;
            }
            authService.authenticate(this.user.email, this.user.password)
                .then(function () {
                    $state.go('activities');
                });
        }
    }
};
