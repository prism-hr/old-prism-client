class WizardNavigationController {
    $onInit() {
        this.steps = this.wizard.getSteps().slice(0);
        this.display = this.wizard.getDisplayData();
        this.wizardType = this.wizard.getWizardType();
    }
}

export const WizardNavigation = {
    template: require('./wizard-navigation.html'),
    bindings: {
        wizard: '<'
    },
    controller: WizardNavigationController
};
