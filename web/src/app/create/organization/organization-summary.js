class OrganizationSummaryController {
    /** @ngInject */
    constructor($q, $state, rx, Restangular, cloudinary, welcomeService) {
        this.$q = $q;
        this.$state = $state;
        this.rx = rx;
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

        this.rx.createObservableFunction(this, 'organizationNameChanged')
            .debounce(250)
            .distinctUntilChanged(args => args[0])
            .flatMapLatest(args => {
                this.form.$setValidity('organizationNameCheck', false);
                return this.Restangular.all('organizationImplementations').getList({
                    context: this.wizardType,
                    searchTerm: args[0]
                })
                    .then(organizations => {
                        this.form.$setValidity('organizationNameCheck', true);
                        return [args[0], args[1], organizations.plain()];
                    });
            })
            .subscribe(args => {
                const name = args[0];
                const organization = args[2].find(o => o.name === name);
                const nameTaken = !organization || organization.accessCode === this.organization.accessCode;
                this.form[args[1]].$setValidity('nameTaken', nameTaken);
            });
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
                            return this.$state.go('view.' + this.wizardType, {accessCode: accessCode});
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
