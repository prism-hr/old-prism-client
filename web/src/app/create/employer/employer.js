module.exports = {
    template: require('./employer.html'),
    bindings: {
        employerManager: '<'
    },
    /** @ngInject */
    controller: function (Restangular, Upload, $state) {
        var self = this;
        this.organization = this.employerManager.getEmployer();

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

            if (self.step === _.last(createSteps)) {
                self.employerManager.saveEmployer(self.organization)
                    .then(function () {
                        $state.go('employerWelcome');
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
