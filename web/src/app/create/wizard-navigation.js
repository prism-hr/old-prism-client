class WizardNavigationController {
    $onInit() {
        this.steps = this.createSteps.slice(0);
        const previewIndex = this.steps.findIndex(step => step.data.preview);
        if (!this.display.isDraft) {
            this.steps.splice(previewIndex, 1);
        }
    }
}

export const WizardNavigation = {
    template: require('./wizard-navigation.html'),
    bindings: {
        wizardType: '<',
        createSteps: '<',
        display: '<'
    },
    controller: WizardNavigationController
};
