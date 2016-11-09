/** @ngInject */
export class ResourceCreateWizardFactory {

    constructor() {
        const organizationSteps = [
            {id: 'summary', component: 'organizationSummary', title: 'Summary'},
            {id: 'details', component: 'organizationDetails', title: 'Details'}];

        this.steps = {
            PROMOTER: organizationSteps,
            DEPARTMENT: organizationSteps,
            ADVERT: [{id: 'summary', component: 'advertSummary', title: 'Summary'},
                {id: 'recruiter', component: 'advertRecruiter', title: 'Recruiter'},
                {id: 'type', component: 'advertType', title: 'Type'},
                {id: 'header', component: 'advertHeader', title: 'Header'},
                {id: 'salary', component: 'advertSalary', title: 'Salary'},
                {id: 'details', component: 'advertDetails', title: 'Details'},
                {id: 'audience', component: 'advertCandidate', title: 'Candidate'}],
            AUDIENCE: [{id: 'summary', component: 'audienceSummary', title: 'Summary'},
                {id: 'social', component: 'audienceSocial', title: 'Social Promotion'}],
            STUDENT: [{id: 'header', component: 'studentHeader', title: 'Header'},
                {id: 'studies', component: 'studentStudies', title: 'Studies'},
                {id: 'contact', component: 'studentContact', title: 'Contact'},
                {id: 'skills', component: 'studentSkills', title: 'Skills'},
                {id: 'about', component: 'studentAbout', title: 'About you'}]
        };
        _.forEach(this.steps, subSteps => {
            _.forEach(subSteps, (step, index, array) => {
                step.index = index;
                step.data = step.data || {};
                step.data.wizardStep = true;
                if (index === array.length - 1) {
                    step.data.lastStep = true;
                }
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
             * Invoked before trying to enter a step.
             *
             * @param toStep step about to be entered
             * @return {boolean|string} true when step can be entered or `stepName` which router should redirect browser to
             */
            onEnter(toStep) {
                const stateComplete = this.getResource().stateComplete || {};

                let missingStepEncountered = false;
                let lastNotCompleteStep = null;
                _.each(this._steps, step => {
                    if (!missingStepEncountered) {
                        const state = stateComplete[step.id];
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
                const stateComplete = this.getResource().stateComplete || {};
                const currentStep = this.getStepForName(this._currentStep);
                let index = currentStep.index + 1;
                while (index < this._steps.length && stateComplete[this._steps[index].id] === 'invalid') {
                    index++;
                }
                return index < this._steps.length && this._steps[index];
            }

            getPrevStep() {
                const stateComplete = this.getResource().stateComplete || {};
                const currentStep = this.getStepForName(this._currentStep);
                let index = currentStep.index - 1;
                while (index >= 0 && stateComplete[this._steps[index].id] === 'invalid') {
                    index--;
                }
                return index >= 0 && this._steps[index];
            }

            static _afterSave(savedResource) {
                const changedStatus = welcomeService.updateWizardCompleteness(savedResource);
                if (changedStatus) {
                    return $state.go(changedStatus.welcomeType + 'Welcome');
                }
                return $state.go('activities');
            }

            next() {
                const currentStep = this.getStepForName(this._currentStep);
                const resource = this.getResource();
                const wasResourceSaved = Boolean(resource.accessCode);

                if (currentStep.data.lastStep) {
                    return this._resourceManager.commitResource()
                        .then(savedResource => {
                            ResourceCreateWizard._afterSave(savedResource);
                        });
                }

                resource.stateComplete = resource.stateComplete || {};
                resource.stateComplete[this._currentStep] = 'complete';
                const nextStep = this.getNextStep();
                nextStep.available = true; // to make navigation tab enabled before we switch
                return this._resourceManager.saveResource()
                    .then(savedResource => {
                        if (wasResourceSaved) {
                            welcomeService.updateWizardCompleteness(savedResource);
                        } else {
                            welcomeService.addWizardCompleteness(savedResource, {
                                welcomeType: this._welcomeType,
                                wizardType: this._wizardType
                            });
                        }
                        return $state.go(this._wizardType.toLowerCase() + '.' + nextStep.id, {id: savedResource.accessCode});
                    });
            }

            save() {
                return this._resourceManager.saveResource()
                    .then(savedResource => {
                        ResourceCreateWizard._afterSave(savedResource);
                    });
            }

            prev() {
                const prevStep = this.getPrevStep();
                if (prevStep) {
                    return $state.go(this._wizardType.toLowerCase() + '.' + prevStep.id, {id: this.getResource().accessCode});
                }
                return $state.go(this._wizardType.toLowerCase() + 'Welcome');
            }

            skip() {
                const currentStep = this.getStepForName(this._currentStep);
                const clear = currentStep.clear || _.noop;
                const resource = this.getResource();
                clear(resource);
                resource.stateComplete[this._currentStep] = 'skipped';

                return this._resourceManager.saveResource()
                    .then(savedResource => {
                        return $state.go(this._wizardType.toLowerCase() + '.' + this.getNextStep().id, {id: savedResource.accessCode});
                    });
            }

            getDisplayData() {
                const step = _.find(this._steps, {id: this._currentStep});
                const resource = this.getResource();
                const stepIdx = step.index;
                const nextStep = this.getNextStep();
                const prevStep = this.getPrevStep();
                const optional = step.data.optional;
                const showNavigation = Boolean(resource.accessCode);
                const isDraft = !resource.state || resource.state === 'DRAFT';
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
