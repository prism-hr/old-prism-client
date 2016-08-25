module.exports = {
    templateUrl: 'app/create/employer/employer-organization.html',
    controller: function () {

        this.step = 0;

        this.submit = function (form) {
            if (!form.$valid) {
                return;
            }
            this.step++;
        };

    }
};
