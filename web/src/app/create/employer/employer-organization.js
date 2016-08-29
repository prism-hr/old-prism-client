module.exports = {
    template: require('./employer-organization.html'),
    /** @ngInject */
    controller: function (Restangular, Upload) {
        var self = this;
        this.step = 0;
        this.organizationFiles = {};

        this.submit = function (form) {
            if (!form.$valid) {
                return;
            }
            if (self.step === 1) {
                self.organization.category = self.category;
            }

            if (self.step === 4) {
                self.organization.organization = {name: self.organization.name};
                var url = Restangular.all('organizationImplementations').getRestangularUrl();
                Upload.upload({
                    url: url,
                    data: {
                        data: Upload.json(self.organization),
                        file: self.organizationFiles.logo
                    }
                });
            } else {
                self.step++;
            }
        };

        this.back = function () {
            self.step--;
        };
    }
};
