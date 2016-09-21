/** @ngInject */
module.exports = function () {
    var thisProvider = this;
    var steps = {
        PROMOTER: [{id: 'lookup', component: 'organizationLookup', title: 'Name & Logo'},
            {id: 'summary', component: 'organizationSummary', title: 'Summary, Locations & Areas'},
            {id: 'web', component: 'organizationWeb', title: 'Web & Size'},
            {id: 'assets', component: 'organizationAssets', title: 'Background & Description', data: {optional: true}},
            {id: 'preview', component: 'organizationPreview', title: 'Preview', data: {preview: true}}],
        DEPARTMENT: [{id: 'lookup', component: 'organizationLookup', title: 'Name & Logo'},
            {id: 'summary', component: 'organizationSummary', title: 'Summary, Locations & Areas'},
            {id: 'web', component: 'organizationWeb', title: 'Web & Size'},
            {id: 'assets', component: 'organizationAssets', title: 'Background & Description', data: {optional: true}},
            {id: 'preview', component: 'organizationPreview', title: 'Preview', data: {preview: true}}],
        POSITION: [{id: 'category', component: 'positionCategory', title: 'Category'},
            {id: 'details', component: 'positionDetails', title: 'Title, Type & Summary'},
            {id: 'location', component: 'positionLocations', title: 'Location, Industries & Audience '},
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
            this._steps = angular.copy(thisProvider.getStepDefinitions(resourceType));

            this.getStepForName = function (stepName) {
                return _.find(this._steps, {id: stepName});
            };
        }

        ResourceCreateWizard.prototype.getResource = function () {
            return this._resourceManager.getResource();
        };

        ResourceCreateWizard.prototype.getCurrentStep = function () {
            return this.getStepForName(this._currentStep);
        };

        /**
         * Invoked before trying to enter a step.
         *
         * @param toStep step about to be entered
         * @return {boolean|string} true when step can be entered or `stepName` which router should redirect browser to
         */
        ResourceCreateWizard.prototype.onEnter = function (toStep) {
            var stateComplete = this.getResource().stateComplete || [];

            var missingStepEncountered = false;
            var lastNotCompleteStep = null;
            _.each(this._steps, function (step) {
                if (!missingStepEncountered) {
                    step.available = true;
                    var complete = _.find(stateComplete, {section: step.id});
                    if (complete) {
                        step.complete = true;
                        step.skipped = complete.skipped;
                    } else if (!step.data.optional) {
                        missingStepEncountered = true;
                        lastNotCompleteStep = step.id;
                    }
                }
            });

            if (_.find(this._steps, {id: toStep}).available) {
                this._currentStep = toStep;
                return true;
            }
            return lastNotCompleteStep;
        };

        ResourceCreateWizard.prototype.getNextStep = function () {
            var currentStep = this.getStepForName(this._currentStep);
            return currentStep.index + 1 < this._steps.length && this._steps[currentStep.index + 1];
        };

        ResourceCreateWizard.prototype.getPrevStep = function () {
            var currentStep = this.getStepForName(this._currentStep);
            return currentStep.index > 0 && this._steps[currentStep.index - 1];
        };

        ResourceCreateWizard.prototype.next = function () {
            var self = this;

            var nextStep = this.getNextStep();
            if (!nextStep) {
                $state.go(this._resourceType.toLowerCase() + 'Welcome');
            }

            this._resourceManager.saveResource(this._currentStep)
                .then(function (resource) {
                    $state.go(self._resourceType.toLowerCase() + '.' + self.getNextStep().id, {id: resource.id || 'new'});
                });
        };

        ResourceCreateWizard.prototype.prev = function () {
            var prevStep = this.getPrevStep();
            if (prevStep) {
                $state.go(this._resourceType.toLowerCase() + '.' + prevStep.id, {id: this.getResource().id});
            } else {
                $state.go(this._resourceType.toLowerCase() + 'Welcome');
            }
        };

        ResourceCreateWizard.prototype.getSteps = function () {
            return this._steps;
        };

        return {
            getWizard: function (resourceManager, wizardCategory) {
                return new ResourceCreateWizard(resourceManager, wizardCategory);
            }
        };
    };
};
