class OrganizationLookupController {
    constructor($q, Restangular) {
        this.$q = $q;
        this.Restangular = Restangular;
    }

    $onInit() {
        this.showDepartment = this.wizardType !== 'promoter' || undefined;
        this.editingMode = Boolean(this.organization.accessCode);

        if (this.organization.accessCode) {
            if (this.organization.name === this.organization.organization.name) {
                this.selectedOrganization = _.pick(this.organization.organization, ['accessCode', 'name']);
                this.editableName = 'ORGANIZATION';
            } else {
                this.selectedOrganization = _.pick(this.organization.organization, ['accessCode', 'name']);
                this.selectedDepartment = _.pick(this.organization, ['accessCode', 'name']);
                this.showDepartment = true;
                this.editableName = 'IMPLEMENTATION';
            }
        }
        this.updateOrganizationDepartment();
    }

    organizationSelected() {
        this.showDepartment = this.wizardType !== 'promoter' || undefined;
        this.updateOrganizationDepartment();
    }

    departmentSelected() {
        this.updateOrganizationDepartment();
    }

    updateOrganizationDepartment() {
        if (this.selectedOrganization) {
            this.organization.organization = _.pick(this.selectedOrganization, ['accessCode', 'name']);
            this.organization.name = this.selectedOrganization.name;
            if (this.selectedOrganization.organizationImplementation) {
                this.organization.accessCode = this.selectedOrganization.organizationImplementation.accessCode;
            }
        }
        if (this.selectedDepartment) {
            this.organization.name = this.selectedDepartment.name;
            this.organization.accessCode = this.selectedDepartment.accessCode;
        }
        const organizationValid = _.get(this.selectedOrganization, 'name.length');
        const departmentValid = this.showDepartment !== undefined && (!this.showDepartment || _.get(this.selectedDepartment, 'name.length'));
        const complete = organizationValid && departmentValid;
        this.changed({complete});
    }

    showDepartmentChanged() {
        this.selectedDepartment = null;
        this.updateOrganizationDepartment();
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

    getDepartments(searchText) {
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

    onOrganizationNameChanged(name) {
        this.organization.name = name;
    }

}

export const OrganizationLookup = {
    template: require('./organization-lookup.html'),
    bindings: {
        organization: '=',
        wizardType: '@',
        form: '<',
        changed: '&'
    },
    controller: OrganizationLookupController
};
