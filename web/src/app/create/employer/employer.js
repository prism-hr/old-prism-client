module.exports = {
    template: require('./employer.html'),
    bindings: {
        employerManager: '<'
    },
    /** @ngInject */
    controller: function (Restangular, Upload, $state, createSteps) {
        var self = this;
        this.createSteps = createSteps;
        this.organization = self.employerManager.getEmployer();

        this.submit = function (form) {
            if (!form.$valid) {
                return;
            }

            if ($state.current.data.lastCreateStep) {
                self.employerManager.saveEmployer(self.organization)
                    .then(function (response) {
                        $state.go('employer.view', {id: response.data.id}, {reload: true});
                    });
            } else {
                var nextStep = createSteps.employer[$state.current.data.stepIdx + 1].id;
                $state.go('employer.' + nextStep, {id: $state.params.id});
            }
        };

        this.back = function () {
            if ($state.current.data.stepIdx === 0) {
                $state.go('employerWelcome');
            } else {
                var prevStep = createSteps.employer[$state.current.data.stepIdx - 1].id;
                $state.go('employer.' + prevStep, {id: $state.params.id});
            }
        };

    }
};
