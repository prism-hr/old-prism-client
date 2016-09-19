module.exports = {
    template: require('./position.html'),
    bindings: {
        wizard: '<'
    },
    /** @ngInject */
    controller: function ($rootScope) {
        var self = this;

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
    }
};
