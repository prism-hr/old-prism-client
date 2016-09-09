module.exports = {
    template: require('./employer.html'),
    bindings: {
        employerManager: '<'
    },
    /** @ngInject */
    controller: function ($rootScope, $scope, $timeout, $state, Restangular, Upload, createSteps) {
        var self = this;
        this.createSteps = createSteps;
        $scope.organization = this.organization = self.employerManager.getEmployer();

        $rootScope.$watch('$state.current', function (currentState) {
            self.stepIdx = currentState.data.stepIdx;
        });

        this.next = function (form) {
            if (!form.$valid) {
                return;
            }

            if ($state.current.data.lastCreateStep) {
                saveEmployer()
                    .then(function (response) {
                        var savedId = self.organization.id || response.data.id;
                        $state.go('employer.view', {id: savedId}, {reload: true});
                    });
            } else {
                var nextStep = createSteps.employer[self.stepIdx + 1].id;
                $state.go('employer.' + nextStep, {id: $state.params.id});
            }
        };

        this.back = function () {
            if (self.stepIdx === 0) {
                $state.go('employerWelcome');
            } else {
                var prevStep = createSteps.employer[self.stepIdx - 1].id;
                $state.go('employer.' + prevStep, {id: $state.params.id});
            }
        };

        var watchTimeout;
        var oldOrganization;
        this.$doCheck = function () {
            if (oldOrganization && !angular.equals(this.organization, oldOrganization)) {
                if (watchTimeout) {
                    $timeout.cancel(watchTimeout);
                }
                watchTimeout = $timeout(saveEmployer, 1000);
            }
            oldOrganization = angular.copy(this.organization);
        };

        function saveEmployer() {
            self.loading = true;
            return self.employerManager.saveEmployer(self.organization)
                .then(function (response) {
                    self.loading = false;
                    return response;
                });
        }
    }
};
