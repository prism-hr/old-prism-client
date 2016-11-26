class OrganizationSummaryController {
    constructor($q, $state, Restangular, cloudinary, welcomeService) {
        this.$q = $q;
        this.$state = $state;
        this.Restangular = Restangular;
        this.cloudinary = cloudinary;
        this.welcomeService = welcomeService;
    }

    $onInit() {
        if (this.organization.description) {
            this.showDescription = true;
        }
        if (this.organization.accessCode) {
            this.editingMode = true;
            this.showSummary = true;
            if (this.organization.name === this.organization.organization.name) {
                this.editableName = 'ORGANIZATION';
            } else {
                this.showDepartment = true;
                this.editableName = 'IMPLEMENTATION';
            }
        }
        this.wizard.registerCustomNextHandler(this._onNext.bind(this));
    }

    $onDestroy() {
        this.wizard.registerCustomNextHandler(null);
    }

    _onNext() {
        if (!this.editingMode && this.organization.accessCode) {
            if (this.requestAccess) {
                const accessCode = this.organization.organizationImplementationAccessCode || this.organization.accessCode;
                this.Restangular.one('organizationImplementations', accessCode).one('join').customPUT({})
                    .then(() => {
                        if (this.welcomeType) {
                            this.welcomeService.updateWizardCompleteness(this.organization, this.wizardType, this.welcomeType, {accessRequested: true});
                            return this.$state.go(this.welcomeType + 'Welcome');
                        }
                        return this.$state.go('activities');
                    });
            } else {
                this.$state.reload();
            }
            return 'handled';
        }
    }

    organizationChanged(complete) {
        this.requestAccess = null;
        this.showRequestAccess = complete && this.organization.accessCode;
        this.showSummary = complete && !this.showRequestAccess;
    }

    onOrganizationNameChanged(name) {
        this.organization.name = name;
    }
}

export const OrganizationSummary = {
    template: require('./organization-summary.html'),
    bindings: {
        welcomeType: '@',
        wizardType: '@',
        organization: '=',
        form: '<',
        wizard: '<'
    },
    controller: OrganizationSummaryController
};
