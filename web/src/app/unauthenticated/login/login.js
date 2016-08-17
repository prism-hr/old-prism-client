module.exports = {
    templateUrl: 'app/unauthenticated/login/login.html',
    bindings: {
        activity: '<',
        action: '@',
        returnTo: '<'
    },
    controller: function ($state, AuthService) {
        var self = this;
        this.activity = this.activity || {user: {}};
        this.user = this.activity.user;

        this.submit = function (form) {
            if (!form.$valid) {
                return;
            }
            AuthService.authenticate(this.user.email, this.user.password)
                .then(function () {
                    $state.go(self.returnTo.state, self.returnTo.params, { reload: true });
                });
        }
    }
};
