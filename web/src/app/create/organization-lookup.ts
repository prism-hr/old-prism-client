import * as _ from 'lodash';

class OrganizationLookupController {
    wizardType: string;
    organization: any;
    showDepartment: boolean;
    selectedOrganization: any;
    selectedDepartment: any;
    changed: Function;

    constructor(private $q: ng.IQService, private Restangular: Restangular.IService) {
    }

    $onInit() {
        this.showDepartment = this.wizardType !== 'promoter' || undefined;

        this.organization = this.organization || {};
        if (this.organization.accessCode) {
            if (this.organization.name === this.organization.organization.name) {
                this.selectedOrganization = this.pickOrganizationFields(this.organization.organization);
                this.showDepartment = false;
            } else {
                this.selectedOrganization = this.pickOrganizationFields(this.organization.organization);
                this.selectedDepartment = this.pickOrganizationFields(this.organization);
                this.showDepartment = true;
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
            this.organization.organization = this.pickOrganizationFields(this.selectedOrganization);
            this.organization.name = this.selectedOrganization.name;
            this.organization.documentLogoImage = this.selectedOrganization.documentLogoImage;
            if (this.selectedOrganization.organizationImplementation) {
                this.organization.accessCode = this.selectedOrganization.organizationImplementation.accessCode;
            }
        }
        if (this.selectedDepartment) {
            this.organization.name = this.selectedDepartment.name;
            this.organization.documentLogoImage = this.selectedDepartment.documentLogoImage;
            this.organization.accessCode = this.selectedDepartment.accessCode;
        }
        const organizationValid = _.get(this.selectedOrganization, 'name.length');
        const departmentValid = this.showDepartment === false || (this.showDepartment && _.get(this.selectedDepartment, 'name.length'));
        const complete = organizationValid && departmentValid;
        this.changed({complete});
    }

    showDepartmentChanged() {
        this.selectedDepartment = null;
        this.updateOrganizationDepartment();
    }

    getOrganizations(searchText: string) {
        return this.Restangular.all('organizations').getList({searchTerm: searchText})
            .then((organizations: Restangular.ICollection) => {
                organizations = organizations.plain();
                const nameTaken = _.find(organizations, {name: searchText});
                if (searchText.length >= 2 && !nameTaken) {
                    organizations.unshift({name: searchText});
                }
                return organizations;
            });
    }

    getDepartments(searchText: string) {
        let searchPromise;
        if (this.selectedOrganization.accessCode) {
            searchPromise = this.Restangular.one('organizations', this.selectedOrganization.accessCode).all('organizationImplementations').getList({searchTerm: searchText})
                .then((implementations: Restangular.ICollection) => implementations.plain());
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

    pickOrganizationFields(organization: any) {
        return _.pick(organization, ['accessCode', 'name', 'documentLogoImage']);
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
