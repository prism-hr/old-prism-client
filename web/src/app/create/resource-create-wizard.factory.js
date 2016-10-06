/** @ngInject */
export class ResourceCreateWizardFactory {

    constructor() {
        function clearAssets(resource) {
            resource.documentBackgroundImage = null;
            resource.description = null;
        }

        const organizationSteps = [{id: 'summary', component: 'organizationSummary', title: 'Summary'},
            {id: 'details', component: 'organizationDetails', title: 'Details'},
            {
                id: 'description', component: 'organizationDescription', title: 'Description', data: {optional: true},
                clear: clearAssets
            },
            {id: 'preview', component: 'organizationPreview', title: 'Preview', data: {preview: true}}];

        this.steps = {
            PROMOTER: organizationSteps,
            DEPARTMENT: organizationSteps,
            ADVERT: [{id: 'category', component: 'advertCategory', title: 'Category'},
                {id: 'type', component: 'advertType', title: 'Type'},
                {id: 'header', component: 'advertHeader', title: 'Header'},
                {id: 'salary', component: 'advertSalary', title: 'Salary'},
                {id: 'details', component: 'advertDetails', title: 'Details'},
                {id: 'audience', component: 'advertAudience', title: 'Audience'},
                {id: 'preview', component: 'advertPreview', title: 'Preview', data: {preview: true}}],
            STUDENT: [{id: 'header', component: 'studentHeader', title: 'Header'},
                {id: 'studies', component: 'studentStudies', title: 'Studies'},
                {id: 'contact', component: 'studentContact', title: 'Contact'},
                {id: 'skills', component: 'studentSkills', title: 'Skills'},
                {id: 'about', component: 'studentAbout', title: 'About you'},
                {id: 'preview', component: 'studentPreview', title: 'Preview', data: {preview: true}}]
        };
        _.forEach(this.steps, subSteps => {
            _.forEach(subSteps, (step, index) => {
                step.index = index;
                step.data = step.data || {};
                step.data.wizardStep = true;
            });
        });
    }

    getStepDefinitions(resourceType) {
        return this.steps[resourceType];
    }

    /** @ngInject */
    $get($state) {
        class ResourceCreateWizard {
            constructor(resourceManager, resourceType, steps) {
                if (!resourceManager) {
                    throw new Error('Missing resource manager');
                }
                this._resourceManager = resourceManager;
                this._resourceType = resourceType;
                this._steps = steps;
                this._stepSubject = new Rx.Subject();
            }

            getResource() {
                return this._resourceManager.getResource();
            }

            getCurrentStep() {
                return this.getStepForName(this._currentStep);
            }

            getStepForName(stepName) {
                return _.find(this._steps, {id: stepName});
            }

            /**
             * Invoked before trying to enter a step.
             *
             * @param toStep step about to be entered
             * @return {boolean|string} true when step can be entered or `stepName` which router should redirect browser to
             */
            onEnter(toStep) {
                const stateComplete = this.getResource().stateComplete || [];

                let missingStepEncountered = false;
                let lastNotCompleteStep = null;
                _.each(this._steps, step => {
                    if (!missingStepEncountered) {
                        step.available = true;
                        const complete = _.find(stateComplete, {section: step.id});
                        if (complete) {
                            step.complete = true;
                            step.skipped = complete.skipped;
                        } else if (!step.data.optional) {
                            missingStepEncountered = true;
                            lastNotCompleteStep = step.id;
                        }
                    }
                });

                const toStepDefinition = _.find(this._steps, {id: toStep});
                // if (toStepDefinition.available) {
                this._currentStep = toStep;
                this._stepSubject.onNext(toStepDefinition);
                return true;
                // }
                // return lastNotCompleteStep;
            }

            stepSubscribe(observer) {
                return this._stepSubject.subscribe(observer);
            }

            getNextStep() {
                const currentStep = this.getStepForName(this._currentStep);
                return currentStep.index + 1 < this._steps.length && this._steps[currentStep.index + 1];
            }

            getPrevStep() {
                const currentStep = this.getStepForName(this._currentStep);
                return currentStep.index > 0 && this._steps[currentStep.index - 1];
            }

            next() {
                const nextStep = this.getNextStep();
                if (!nextStep) {
                    $state.go(this._resourceType.toLowerCase() + 'Welcome');
                }

                return this._resourceManager.saveResource(this._currentStep)
                    .then(resource => {
                        return $state.go(this._resourceType.toLowerCase() + '.' + this.getNextStep().id, {id: resource.accessCode || 'new'});
                    });
            }

            prev() {
                const prevStep = this.getPrevStep();
                if (prevStep) {
                    return $state.go(this._resourceType.toLowerCase() + '.' + prevStep.id, {id: this.getResource().accessCode});
                }
                return $state.go(this._resourceType.toLowerCase() + 'Welcome');
            }

            skip() {
                const currentStep = this.getStepForName(this._currentStep);
                const clear = currentStep.clear || _.noop;
                clear(this.getResource());

                return this._resourceManager.saveResource(this._currentStep, {skipped: true})
                    .then(resource => {
                        return $state.go(this._resourceType.toLowerCase() + '.' + this.getNextStep().id, {id: resource.accessCode});
                    });
            }

            getSteps() {
                return this._steps;
            }
        }

        return {
            getWizard: (resourceManager, wizardCategory) => {
                return new ResourceCreateWizard(resourceManager, wizardCategory, angular.copy(this.getStepDefinitions(wizardCategory)));
            }
        };
    }
}
