module.exports = {
    templateUrl: 'app/unauthenticated/login/login.html',
    bindings: {
        activity: '<',
        action: '@',
        accessCode: '@'
    },
    controller: function () {

        this.submit = function (form) {
            if (!form.$valid) {
                return;
            }
            console.log('Login!');
        }
    }
};
