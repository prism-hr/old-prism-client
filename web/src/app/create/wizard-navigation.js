class WizardNavigationController {
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
