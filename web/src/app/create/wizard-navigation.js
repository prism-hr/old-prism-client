class WizardNavigationController {
    $onInit() {
        this.steps = this.createSteps.slice(0);
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
