import * as angular from 'angular';
import * as _ from 'lodash';
import {Subject, Subscription} from 'rxjs';
import {WelcomeService} from '../welcome/welcome.service';
import {IResourceManager} from './resource-manager.factory';
import TaggableRepresentation = bf.TaggableRepresentation;

/** @ngInject */
export class ResourceCreateWizardFactory {
    steps: WizardStepsDefinition;

    constructor() {
        const organizationSteps = [
            {id: 'summary', component: 'organizationSummary', title: 'Summary'},
            {id: 'details', component: 'organizationDetails', title: 'Details', data: {hasTags: true}}];

        this.steps = {
            promoter: organizationSteps,
            department: organizationSteps,
            advert: [{id: 'summary', component: 'advertSummary', title: 'Summary'},
                {id: 'recruiter', component: 'advertRecruiter', title: 'Recruiter'},
                {id: 'type', component: 'advertType', title: 'Options'},
                {id: 'salary', component: 'advertSalary', title: 'Salary'},
                {id: 'details', component: 'advertDetails', title: 'Description'},
                {id: 'candidate', component: 'advertCandidate', title: 'Candidates', data: {hasTags: true}}],
            audience: [{id: 'summary', component: 'audienceSummary', title: 'Share your Advert'}],
            student: [{id: 'header', component: 'studentHeader', title: 'Header'},
                {id: 'about', component: 'studentAbout', title: 'About you'},
                {id: 'skills', component: 'studentSkills', title: 'Skills'}],
            profile: [{id: 'qualifications', component: 'profileQualifications', title: 'Qualifications'},
                {id: 'experiences', component: 'profileExperiences', title: 'Experiences'},
                {id: 'referees', component: 'profileReferees', title: 'Referees'}]
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
    $get($state: ng.ui.IStateService, $mdToast: ng.material.IToastService, welcomeService: WelcomeService) {
        class ResourceCreateWizard {
            _stepSubject: Subject<any>;
            _currentStep: string;
            form: ng.IFormController;
            customNextHandler: any;

            constructor(private _resourceManager: IResourceManager, private _welcomeType: string, private _wizardType: string, private _steps: any) {
                this._stepSubject = new Subject();
            }

            getResource() {
                return this._resourceManager.getResource();
            }

            getWizardType() {
                return this._wizardType;
            }

            getCurrentStep() {
                return this.getStepForName(this._currentStep);
            }

            getStepForName(stepName: string) {
                return _.find(this._steps, {id: stepName});
            }

            /**
             * Gets list step statuses for given resource and wizard.
             */
            getWizardComplete() {
                const resource = this.getResource();
                const stateComplete = (resource as any).stateComplete = (resource as any).stateComplete || {};
                stateComplete[this._wizardType] = stateComplete[this._wizardType] || {state: 'DRAFT', steps: {}};
                return stateComplete[this._wizardType];
            }

            /**
             * Invoked before trying to enter a step.
             *
             * @param toStep step about to be entered
             * @return {boolean|string} true when step can be entered or `stepName` which router should redirect browser to
             */
            onEnter(toStep: string) {
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

                const toStepDefinition: any = _.find(this._steps, {id: toStep});
                if (toStepDefinition.available) {
                    this._currentStep = toStep;
                    this._stepSubject.next(toStep);
                    return true;
                }
                return lastNotCompleteStep;
            }

            stepSubscribe(observer: any): Subscription {
                return this._stepSubject.subscribe(observer);
            }

            setForm(form: ng.IFormController) {
                this.form = form;
            }

            getNextStep() {
                const wizardComplete: any = this.getWizardComplete();
                const currentStep: any = this.getStepForName(this._currentStep);
                let index = currentStep.index + 1;
                while (index < this._steps.length && wizardComplete.steps[this._steps[index].id] === 'invalid') {
                    index++;
                }
                return index < this._steps.length && this._steps[index];
            }

            getPrevStep() {
                const wizardComplete: any = this.getWizardComplete();
                const currentStep: any = this.getStepForName(this._currentStep);
                let index = currentStep.index - 1;
                while (index >= 0 && wizardComplete.steps[this._steps[index].id] === 'invalid') {
                    index--;
                }
                return index >= 0 && this._steps[index];
            }

            registerCustomNextHandler(handler: any) {
                this.customNextHandler = handler;
            }

            continue() {
                if (!this.form.$valid) {
                    return;
                }

                this.form.$setPristine();

                if (this.customNextHandler) {
                    if (this.customNextHandler() === 'handled') {
                        return;
                    }
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
                    (resource as TaggableRepresentation).addSuggestedTags = true;
                }
                return this.persist()
                    .then(savedResource => {
                        if (!nextStep) {
                            return this._resourceManager.commitResource()
                                .then(() => {
                                    this.redirectAway();
                                });
                        }
                        return $state.go('manage.' + this._wizardType + '.' + nextStep.id, {id: savedResource.accessCode});
                    });
            }

            save() {
                if (!this.form.$valid) {
                    return;
                }

                this.form.$setPristine();

                return this.persist()
                    .then(() => {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Saved!')
                                .hideDelay(3000)
                        );
                    });
            }

            saveAndExit() {
                if (!this.form.$valid) {
                    return;
                }

                this.form.$setPristine();

                return this.persist()
                    .then(() => {
                        this.redirectAway();
                    });
            }

            prev() {
                this.form.$setPristine();

                const prevStep = this.getPrevStep();
                if (prevStep) {
                    return $state.go('manage.' + this._wizardType + '.' + prevStep.id, {id: this.getResource().accessCode});
                } else {
                    this.redirectAway();
                }
            }

            next() {
                this.form.$setPristine();

                const nextStep = this.getNextStep();
                if (nextStep) {
                    return $state.go('manage.' + this._wizardType + '.' + nextStep.id, {id: this.getResource().accessCode});
                } else {
                    this.redirectAway();
                }
            }

            skip() {
                this.form.$setPristine();

                const wizardComplete: any = this.getWizardComplete();
                const currentStep: any = this.getStepForName(this._currentStep);
                const clear = currentStep.clear || _.noop;
                const resource = this.getResource();
                clear(resource);
                wizardComplete.steps[this._currentStep] = 'skipped';

                return this.persist()
                    .then(savedResource => {
                        return $state.go('manage.' + this._wizardType + '.' + this.getNextStep().id, {id: savedResource.accessCode});
                    });
            }

            persist() {
                return this._resourceManager.saveResource()
                    .then(savedResource => {
                        welcomeService.updateWizardCompleteness(savedResource, this._wizardType, this._welcomeType);
                        return savedResource;
                    });
            }

            getDisplayData() {
                const step: any = _.find(this._steps, {id: this._currentStep});
                const resource = this.getResource();
                const state = (resource as any).stateComplete[this._wizardType].state;
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

            private redirectAway(): ng.IPromise<any> {
                if (this._welcomeType) {
                    return $state.go('welcome.' + this._welcomeType);
                }
                return $state.go('activities');
            }
        }

        return {
            getWizard: (resourceManager: IResourceManager, welcomeType: string, wizardType: string) => {
                return new ResourceCreateWizard(resourceManager, welcomeType, wizardType, angular.copy(this.getStepDefinitions()[wizardType]));
            }
        };
    }
}

export interface WizardStepsDefinition {
    [index: string]: Array<WizardStepDefinition>;
}

export interface WizardStepDefinition {
    id: string;
    component: string;
    title: string;
    index?: number;
    data?: any;
}
