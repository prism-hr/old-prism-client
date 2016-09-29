module.exports = {
    template: require('./student.html'),
    bindings: {
        wizard: '<',
        type: '<'
    },
    /** @ngInject */
    controller: function () {
        var self = this;
        this.student = self.wizard.getResource();
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

            form.$setPristine();
            self.wizard.next();
        };

        this.prev = function (form) {
            form.$setPristine();
            self.wizard.prev();
        };

        this.skip = function (form) {
            form.$setPristine();
            self.wizard.skip();
        };

        this.$onDestroy = function () {
            stepSubscription.dispose();
        };
    }
};
