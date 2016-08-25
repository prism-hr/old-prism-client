module.exports = {
    templateUrl: 'app/create/university/university-organization.html',
    controller: function () {

        this.step = 0;

        this.submit = function (form) {
            if (!form.$valid) {
                return;
            }
            this.step++;
        };

        this.back = function() {
            self.step--;
        };
    }
};
