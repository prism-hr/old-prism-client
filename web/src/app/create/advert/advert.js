module.exports = {
    template: require('./advert.html'),
    bindings: {
        wizard: '<'
    },
    /** @ngInject */
    controller: function () {
        var self = this;

        var onStepChange = function (currentStep) {
            if (currentStep) {
                if (currentStep.data.preview) {
                    self.showNavigation = true;
                }
                self.stepIdx = currentStep.index;
                self.nextStep = self.wizard.getNextStep();
                self.prevStep = self.wizard.getPrevStep();
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

        this.$onDestroy = function () {
            stepSubscription.dispose();
        };
    }
};
