/** @ngInject */
module.exports = function () {
    var thisProvider = this;
    var steps = {
        PROMOTER: [{id: 'lookup', component: 'organizationLookup', title: 'Organization Name'},
            {id: 'summary', component: 'organizationSummary', title: 'Summary'},
            {id: 'address', component: 'organizationAddress', title: 'Address'},
            {id: 'assets', component: 'organizationAssets', title: 'Assets', data: {optional: true}},
            {id: 'preview', component: 'organizationPreview', title: 'Preview', data: {preview: true}}]
    };
    _.forEach(steps, function (subSteps) {
        _.forEach(subSteps, function (step, index) {
            step.index = index;
            step.data = step.data || {};
            step.data.wizardStep = true;
        });
    });

    this.getStepDefinitions = function (resourceType) {
        return steps[resourceType];
    };

    /** @ngInject */
    this.$get = function ($q, $state) {
        function ResourceCreateWizard(resourceManager, resourceType) {
            if (!resourceManager) {
                throw new Error('Missing resource manager');
            }
            this._resourceManager = resourceManager;
            this._resourceType = resourceType;
            this.steps = thisProvider.getStepDefinitions(resourceType);

            this.getStepForName = function (stepName) {
                return _.find(this.steps, {id: stepName});
            };
        }

        ResourceCreateWizard.prototype.getResource = function () {
            return this._resourceManager.getResource();
        };

        ResourceCreateWizard.prototype.getCurrentStep = function () {
            return this.getStepForName(this._currentStep);
        };

        ResourceCreateWizard.prototype.onEnter = function (step) {
            var stateComplete = this.getResource().stateComplete;

            var moveTo = _.find(this.steps, function (s) { // find first not complete and not optional step (or requested one)
                if (!stateComplete[s.id]) {
                    return s.id === step || !s.optional;
                }
                return false;
            });
            if (step === moveTo.id) {
                this._currentStep = step;
                return true;
            }
            return moveTo.id;
        };

        ResourceCreateWizard.prototype.getNextStep = function () {
            var currentStep = this.getStepForName(this._currentStep);
            return currentStep.index + 1 < this.steps.length && this.steps[currentStep.index + 1];
        };

        ResourceCreateWizard.prototype.getPrevStep = function () {
            var currentStep = this.getStepForName(this._currentStep);
            return currentStep.index > 0 && this.steps[currentStep.index - 1];
        };

        ResourceCreateWizard.prototype.next = function () {
            var self = this;
            // update lastStep
            var resource = this.getResource();
            var currentStep = this.getStepForName(this._currentStep);
            resource.stateComplete[currentStep.id] = true;

            this._resourceManager.saveResource()
                .then(function (resource) {
                    $state.go(self._resourceType.toLowerCase() + '.' + self.getNextStep().id, {id: resource.id});
                });
        };

        ResourceCreateWizard.prototype.finish = function () {
            $state.go(this._resourceType.toLowerCase() + 'Welcome');
        };

        ResourceCreateWizard.prototype.prev = function () {
            var prevStep = this.getPrevStep();
            if (prevStep) {
                $state.go(this._resourceType.toLowerCase() + '.' + prevStep.id, {id: this.getResource().id});
            } else {
                $state.go(this._resourceType.toLowerCase() + 'Welcome');
            }
        };

        return {
            getWizard: function (resourceManager, wizardCategory) {
                return new ResourceCreateWizard(resourceManager, wizardCategory);
            }
        };
    };
};
