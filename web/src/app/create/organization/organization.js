module.exports = {
    template: require('./organization.html'),
    bindings: {
        resourceManager: '<',
        type: '<'
    },
    /** @ngInject */
    controller: function ($rootScope, $timeout, $state, Restangular, Upload, createSteps) {
        var self = this;
        this.typeLower = this.type.toLowerCase();
        this.organization = self.resourceManager.getResource();
        this.createSteps = createSteps[self.typeLower];
        if (this.organization.id && !_.endsWith($state.current.name, '.preview')) { // if existing organization don't show preview tab (unless requested)
            this.createSteps.splice(-1, 1);
        }

        $rootScope.$watch('$state.current', function (currentState) {
            self.stepIdx = _.get(currentState.data, 'stepIdx');
            self.nextStep = self.stepIdx + 1 < self.createSteps.length && self.createSteps[self.stepIdx + 1];
            self.prevStep = self.stepIdx > 0 && self.createSteps[self.stepIdx - 1];
        });

        this.next = function (form) {
            if (!form.$valid) {
                return;
            }

            if (!self.organization.id && self.stepIdx === self.createSteps.length - 2) { // step before preview, save it now
                saveOrganization()
                    .then(function (organization) {
                        $state.go(self.typeLower + '.' + self.nextStep.id, {id: organization.id}, {reload: true});
                    });
            } else if (self.nextStep) {
                $state.go(self.typeLower + '.' + self.nextStep.id, {id: $state.params.id});
            } else {
                $state.go(self.typeLower + 'Welcome');
            }
        };

        this.back = function () {
            if (self.prevStep) {
                $state.go(self.typeLower + '.' + self.prevStep.id, {id: $state.params.id});
            } else {
                $state.go(self.typeLower + 'Welcome');
            }
        };

        var watchTimeout;
        var oldOrganization;
        this.$doCheck = function () {
            if (!this.organization.id) {
                return;
            }
            if (oldOrganization && !angular.equals(this.organization, oldOrganization)) {
                if (watchTimeout) {
                    $timeout.cancel(watchTimeout);
                }
                watchTimeout = $timeout(saveOrganization, 1000);
            }
            oldOrganization = angular.copy(this.organization);
        };

        function saveOrganization() {
            self.loading = true;
            return self.resourceManager.saveResource(self.organization)
                .then(function (response) {
                    self.loading = false;
                    return response;
                });
        }
    }
};
