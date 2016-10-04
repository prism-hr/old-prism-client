class OrganizationSummaryController {
    constructor($q, $state, Restangular) {
        this.$q = $q;
        this.$state = $state;
        this.Restangular = Restangular;
    }

    $onInit() {
        this.showImplementationName = this.type === 'DEPARTMENT';
        this.editingOrganization = Boolean(this.organization.id);

        this.setView('details');
        if (this.organization.id) {
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
                const nameTaken = _.find(organizations, {name: searchText});
                if (searchText.length >= 2 && !nameTaken) {
                    organizations.unshift({name: searchText});
                }
                return organizations;
            });
    }

    organizationSelected(organization) {
        if (organization.organizationImplementationId) {
            this.requestOrganization = organization;
            this.setView('request');
        } else {
            this.organization.organization = _.pick(organization, ['id', 'name']);
            this.organization.name = organization.name;
            // this.organization.documentLogoImage = {id: organization.documentLogoImageId};
        }
    }

    addDepartment(organization) {
        if (organization) {
            this.organization.organization = _.pick(organization, ['id', 'name']);
        }
        this.organization.name = null;
        this.showImplementationName = true;
        this.setView('details');
    }

    getOrganizationImplementations(searchText) {
        let searchPromise;
        if (this.selectedOrganization.id) {
            searchPromise = this.Restangular.one('organizations', this.selectedOrganization.id).all('organizationImplementations').getList({searchTerm: searchText})
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
        if (implementation.id) {
            this.requestOrganization = implementation;
            implementation.isImplementation = true;
            this.setView('request');
        } else {
            this.organization.name = implementation.name;
        }
    }

    // Rx.createObservableFunction(this, 'implementationNameChanged')
    //     .flatMapLatest(function (name) {
    //         return Restangular.one('organizations', this.organization.organization.id).all('organizationImplementations').getList({searchTerm: name})
    //             .then(function (implementations) {
    //                 return implementations.plain();
    //             });
    //     })
    //     .subscribe(function (results) {
    //         console.log(results);
    //     });

    requestAccess(organization) {
        const id = organization.organizationImplementationId || organization.id;
        this.Restangular.one('organizationImplementations', id).one('join').customPUT({})
            .then(() => {
                this.$state.go('activities');
            });
    }

    startOver() {
        this.requestOrganization = null;
        this.selectedOrganization = null;
        this.selectedOrganizationImplementation = null;
        this.organization.organization = this.organization.name = null;
        this.showImplementationName = this.type === 'DEPARTMENT';
        this.setView('details');
    }

    onOrganizationNameChanged(name) {
        this.organization.name = name;
    }
}

export const OrganizationSummary = {
    template: require('./organization-summary.html'),
    bindings: {
        type: '@',
        organization: '=',
        form: '<'
    },
    controller: OrganizationSummaryController
};
