/** @ngInject */
export class ResourceCreateWizardFactory {

    constructor() {
        const organizationSteps = [
            {id: 'summary', component: 'organizationSummary', title: 'Summary'},
            {id: 'details', component: 'organizationDetails', title: 'Details', data: {hasTags: true}}];

        this.steps = {
            promoter: organizationSteps,
            department: organizationSteps,
            advert: [{id: 'summary', component: 'advertSummary', title: 'Summary'},
                {id: 'recruiter', component: 'advertRecruiter', title: 'Recruiter'},
                {id: 'type', component: 'advertType', title: 'Type'},
                {id: 'salary', component: 'advertSalary', title: 'Salary'},
                {id: 'details', component: 'advertDetails', title: 'Description'},
                {id: 'candidate', component: 'advertCandidate', title: 'Candidates', data: {hasTags: true}}],
            audience: [{id: 'summary', component: 'audienceSummary', title: 'Summary'},
                {id: 'social', component: 'audienceSocial', title: 'Social Promotion'}],
            student: [{id: 'header', component: 'studentHeader', title: 'Header'},
                {id: 'contact', component: 'studentContact', title: 'Contact'},
                {id: 'studies', component: 'studentStudies', title: 'Studies'},
                {id: 'skills', component: 'studentSkills', title: 'Skills'},
                {id: 'about', component: 'studentAbout', title: 'About you'}]
        };
        _.forEach(this.steps, subSteps => {
            _.forEach(subSteps, (step, index) => {
                step.index = index;
                step.data = step.data || {};
                step.data.wizardStep = true;
            });
        });
    }

    getStepDefinitions() {
        return this.steps;
    }

    /** @ngInject */
    $get($state, welcomeService) {
        class ResourceCreateWizard {
            constructor(resourceManager, welcomeType, wizardType, steps) {
                if (!resourceManager) {
                    throw new Error('Missing resource manager');
                }
                this._resourceManager = resourceManager;
                this._welcomeType = welcomeType;
                this._wizardType = wizardType;
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
             * Gets list step statuses for given resource and wizard.
             */
            getWizardComplete() {
                const resource = this.getResource();
                const stateComplete = resource.stateComplete = resource.stateComplete || {};
                stateComplete[this._wizardType] = stateComplete[this._wizardType] || {state: 'DRAFT', steps: {}};
                return stateComplete[this._wizardType];
            }

            /**
             * Invoked before trying to enter a step.
             *
             * @param toStep step about to be entered
             * @return {boolean|string} true when step can be entered or `stepName` which router should redirect browser to
             */
            onEnter(toStep) {
                const wizardComplete = this.getWizardComplete();

                let missingStepEncountered = false;
                let lastNotCompleteStep = null;
                _.each(this._steps, step => {
                    if (!missingStepEncountered) {
                        const state = wizardComplete.steps[step.id];
                        step.available = state !== 'invalid';
                        if (state) {
                            step.state = state;
                        } else {
                            missingStepEncountered = true;
                            lastNotCompleteStep = step.id;
                        }
                    }
                });

                const toStepDefinition = _.find(this._steps, {id: toStep});
                if (toStepDefinition.available) {
                    this._currentStep = toStep;
                    this._stepSubject.onNext(toStep);
                    return true;
                }
                return lastNotCompleteStep;
            }

            stepSubscribe(observer) {
                return this._stepSubject.subscribe(observer);
            }

            getNextStep() {
                const wizardComplete = this.getWizardComplete();
                const currentStep = this.getStepForName(this._currentStep);
                let index = currentStep.index + 1;
                while (index < this._steps.length && wizardComplete.steps[this._steps[index].id] === 'invalid') {
                    index++;
                }
                return index < this._steps.length && this._steps[index];
            }

            getPrevStep() {
                const wizardComplete = this.getWizardComplete();
                const currentStep = this.getStepForName(this._currentStep);
                let index = currentStep.index - 1;
                while (index >= 0 && wizardComplete.steps[this._steps[index].id] === 'invalid') {
                    index--;
                }
                return index >= 0 && this._steps[index];
            }

            registerCustomNextHandler(handler) {
                this.customNextHandler = handler;
            }

            next() {
                if (this.customNextHandler) {
                    this.customNextHandler();
                    return;
                }
                const resource = this.getResource();

                const wizardComplete = this.getWizardComplete();
                wizardComplete.steps[this._currentStep] = 'complete';
                const nextStep = this.getNextStep();
                if (nextStep) {
                    nextStep.available = true; // to make navigation tab enabled before we switch
                } else {
                    wizardComplete.state = 'COMPLETE';
                }
                if (_.get(nextStep, 'data.hasTags')) {
                    resource.addSuggestedTags = true;
                }
                return this._resourceManager.saveResource()
                    .then(savedResource => {
                        const wizardStatus = welcomeService.updateWizardCompleteness(savedResource, this._wizardType, this._welcomeType);
                        if (!nextStep) {
                            return this._resourceManager.commitResource()
                                .then(() => {
                                    if (wizardStatus) {
                                        return $state.go(wizardStatus.welcomeType + 'Welcome');
                                    }
                                    return $state.go('activities');
                                });
                        }
                        return $state.go(this._wizardType.toLowerCase() + '.' + nextStep.id, {id: savedResource.accessCode || 'new'}); // FIXME drop alternative 'new'
                    });
            }

            save() {
                return this._resourceManager.saveResource()
                    .then(savedResource => {
                        const wizardStatus = welcomeService.updateWizardCompleteness(savedResource, this._wizardType, this._welcomeType);
                        if (wizardStatus) {
                            return $state.go(wizardStatus.welcomeType + 'Welcome');
                        }
                        return $state.go('activities');
                    });
            }

            prev() {
                const prevStep = this.getPrevStep();
                if (prevStep) {
                    return $state.go(this._wizardType.toLowerCase() + '.' + prevStep.id, {id: this.getResource().accessCode});
                }
                return $state.go(this._welcomeType.toLowerCase() + 'Welcome');
            }

            skip() {
                const wizardComplete = this.getWizardComplete();
                const currentStep = this.getStepForName(this._currentStep);
                const clear = currentStep.clear || _.noop;
                const resource = this.getResource();
                clear(resource);
                wizardComplete.steps[this._currentStep] = 'skipped';

                return this._resourceManager.saveResource()
                    .then(savedResource => {
                        return $state.go(this._wizardType.toLowerCase() + '.' + this.getNextStep().id, {id: savedResource.accessCode});
                    });
            }

            getDisplayData() {
                const step = _.find(this._steps, {id: this._currentStep});
                const resource = this.getResource();
                const state = resource.stateComplete[this._wizardType].state;
                const stepIdx = step.index;
                const nextStep = this.getNextStep();
                const prevStep = this.getPrevStep();
                const optional = step.data.optional;
                const showNavigation = Boolean(resource.accessCode);
                const isDraft = state === 'DRAFT';
                return {stepIdx, nextStep, prevStep, optional, showNavigation, isDraft};
            }

            getSteps() {
                return this._steps;
            }
        }

        return {
            getWizard: (resourceManager, welcomeType, wizardType) => {
                return new ResourceCreateWizard(resourceManager, welcomeType, wizardType, angular.copy(this.getStepDefinitions()[wizardType]));
            }
        };
    }
}
