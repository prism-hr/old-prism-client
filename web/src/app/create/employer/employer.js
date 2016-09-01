module.exports = {
    template: require('./employer.html'),
    /** @ngInject */
    controller: function (Restangular, Upload, $state) {
        var self = this;
        this.organizationFiles = {};

        var createSteps = ['category', 'lookup', 'summary', 'address', 'assets'];

        function applyStep(step) {
            self.step = step;
            self.stepIdx = createSteps.indexOf(self.step);
        }

        applyStep($state.params.step);
        this.uiOnParamsChanged = function (newValues) {
            if (newValues.step) {
                applyStep(newValues.step);
            }
        };

        this.submit = function (form) {
            if (!form.$valid) {
                return;
            }
            if (self.step === 'lookup') {
                self.organization.category = self.category;
            }

            if (self.step === 'assets') {
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
                $state.go('employer', {id: $state.params.id, step: createSteps[self.stepIdx + 1]});
            }
        };

        this.back = function () {
            if (self.stepIdx === 0) {
                $state.go('employer');
            } else {
                $state.go('employer', {id: $state.params.id, step: createSteps[self.stepIdx - 1]});
            }
        };
    }
};
