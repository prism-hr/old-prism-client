module.exports = {
    templateUrl: 'app/create/employer/employer-organization.html',
    controller: function () {
        var self = this;
        this.step = 0;

        this.submit = function (form) {
            if (!form.$valid) {
                return;
            }
            if (self.step === 1) {
                self.organization.category = self.category;
            }
            self.step++;
        };

        this.back = function() {
            self.step--;
        };

    }
};
