class OrganizationSummaryController {
    constructor($q, $state, Restangular, welcomeService, fileConversion) {
        this.$q = $q;
        this.$state = $state;
        this.Restangular = Restangular;
        this.welcomeService = welcomeService;
        this.fileConversion = fileConversion;
    }

    $onInit() {
        this.showImplementationName = this.wizardType === 'DEPARTMENT';
        this.editingOrganization = Boolean(this.organization.accessCode);

        this.setView('details');
        if (this.organization.accessCode) {
            if (this.organization.name === this.organization.organization.name) {
                this.selectedOrganization = this.organization;
                this.editableName = 'ORGANIZATION';
            } else {
                this.selectedOrganization = this.organization.organization;
                this.selectedOrganizationImplementation = this.organization;
                this.showImplementationName = true;
                this.editableName = 'IMPLEMENTATION';
            }
        }
    }

    setView(view) {
        this.view = view;
    }

    getOrganizations(searchText) {
        return this.Restangular.all('organizations').getList({searchTerm: searchText})
            .then(organizations => {
                organizations = organizations.plain();
                const nameTaken = _.find(organizations, {name: searchText});
                if (searchText.length >= 2 && !nameTaken) {
                    organizations.unshift({name: searchText});
                }
                return organizations;
            });
    }

    organizationSelected(organization) {
        if (organization.organizationImplementation) {
            this.setRequestView(organization.organizationImplementation);
        } else {
            this.organization.organization = _.pick(organization, ['accessCode', 'name']);
            this.organization.name = organization.name;
            // this.organization.documentLogoImage = {accessCode: organization.documentLogoImageAccessCode};
        }
    }

    addDepartment(organization) {
        if (organization) {
            this.organization.organization = _.pick(organization, ['accessCode', 'name']);
            this.organization.documentLogoImage = organization.documentLogoImage;
        }
        this.organization.name = null;
        this.showImplementationName = true;
        this.setView('details');
    }

    getOrganizationImplementations(searchText) {
        let searchPromise;
        if (this.selectedOrganization.accessCode) {
            searchPromise = this.Restangular.one('organizations', this.selectedOrganization.accessCode).all('organizationImplementations').getList({searchTerm: searchText})
                .then(implementations => implementations.plain());
        } else {
            searchPromise = this.$q.when([]);
        }

        return searchPromise.then(implementations => {
            const nameTaken = _.find(implementations, {name: searchText});
            if (searchText.length >= 2 && !nameTaken) {
                implementations.unshift({name: searchText});
            }
            return implementations;
        });
    }

    organizationImplementationSelected(implementation) {
        if (implementation.accessCode) {
            this.setRequestView(implementation, {isImplementation: true});
        } else {
            this.organization.name = implementation.name;
        }
    }

    setRequestView(organization, params) {
        params = params || {};
        this.Restangular.one('organizationImplementations', organization.accessCode).get()
            .then(o => {
                this.requestOrganization = this.fileConversion.processForDisplay(o.plain());
                this.requestOrganization.isImplementation = params.isImplementation;
                if (this.requestOrganization.actions.includes('edit')) {
                    this.requestOrganization.editRef = this.$state.href(this.wizardType.toLowerCase() + '.summary', {
                        id: this.requestOrganization.accessCode,
                        welcomeType: null
                    });
                }
                this.setView('request');
            });
    }

    // Rx.createObservableFunction(this, 'implementationNameChanged')
    //     .flatMapLatest(function (name) {
    //         return Restangular.one('organizations', this.organization.organization.accessCode).all('organizationImplementations').getList({searchTerm: name})
    //             .then(function (implementations) {
    //                 return implementations.plain();
    //             });
    //     })
    //     .subscribe(function (results) {
    //         console.log(results);
    //     });

    requestAccess(organization) {
        const accessCode = organization.organizationImplementationAccessCode || organization.accessCode;
        this.Restangular.one('organizationImplementations', accessCode).one('join').customPUT({})
            .then(() => {
                if (this.welcomeType) {
                    this.welcomeService.addWizardCompleteness(organization, {
                        welcomeType: this.welcomeType,
                        wizardType: this.wizardType,
                        accessRequested: true
                    });
                    return this.$state.go(this.welcomeType + 'Welcome');
                }
                return this.$state.go('activities');
            });
    }

    startOver() {
        this.requestOrganization = null;
        this.selectedOrganization = null;
        this.selectedOrganizationImplementation = null;
        this.organization.organization = this.organization.name = null;
        this.showImplementationName = this.wizardType === 'DEPARTMENT';
        this.setView('details');
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
        form: '<'
    },
    controller: OrganizationSummaryController
};
