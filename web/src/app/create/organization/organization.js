module.exports = {
    template: require('./organization.html'),
    bindings: {
        wizard: '<',
        type: '<'
    },
    /** @ngInject */
    controller: function () {
        var self = this;
        this.typeLower = self.type.toLowerCase();
        this.type = self.type;
        this.organization = self.wizard.getResource();
        this.createSteps = self.wizard.getSteps();

        var onStepChange = function (currentStep) {
            if (currentStep) {
                if (currentStep.data.preview) {
                    self.showNavigation = true;
                }
                self.stepIdx = currentStep.index;
                self.nextStep = self.wizard.getNextStep();
                self.prevStep = self.wizard.getPrevStep();
                self.optional = currentStep.data.optional;
            }
        };
        var stepSubscription = self.wizard.stepSubscribe(onStepChange);
        onStepChange(self.wizard.getCurrentStep());

        this.next = function (form) {
            if (!form.$valid) {
                return;
            }

            self.wizard.next();
        };

        this.prev = function () {
            self.wizard.prev();
        };

        this.skip = function () {
            self.wizard.skip();
        };

        this.$onDestroy = function () {
            stepSubscription.dispose();
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
