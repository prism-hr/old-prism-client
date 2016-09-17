module.exports = {
    template: require('./organization.html'),
    bindings: {
        wizard: '<',
        type: '<'
    },
    /** @ngInject */
    controller: function ($rootScope, $timeout, $state) {
        var self = this;
        this.typeLower = self.type.toLowerCase();
        this.organization = self.wizard.getResource();
        this.createSteps = self.wizard.getSteps();

        // this.createSteps = createSteps[self.typeLower];
        // if (this.organization.id && !_.endsWith($state.current.name, '.preview')) { // if existing organization don't show preview tab (unless requested)
        //     this.createSteps.splice(-1, 1);
        // }

        $rootScope.$watch('$state.current', function () {
            var currentStep = self.wizard.getCurrentStep();
            if (currentStep) {
                if (currentStep.data.preview) {
                    self.showNavigation = true;
                }
                self.stepIdx = currentStep.index;
                self.nextStep = self.wizard.getNextStep();
                self.prevStep = self.wizard.getPrevStep();
            }
        });

        this.next = function (form) {
            if (!form.$valid) {
                return;
            }

            self.wizard.next();
        };

        this.prev = function () {
            self.wizard.prev();
        };

        // var watchTimeout;
        // var oldOrganization;
        // this.$doCheck = function () {
        //     if (!this.organization.id) {
        //         return;
        //     }
        //     if (oldOrganization && !angular.equals(this.organization, oldOrganization)) {
        //         if (watchTimeout) {
        //             $timeout.cancel(watchTimeout);
        //         }
        //         watchTimeout = $timeout(saveOrganization, 1000);
        //     }
        //     oldOrganization = angular.copy(this.organization);
        // };
    }
};
