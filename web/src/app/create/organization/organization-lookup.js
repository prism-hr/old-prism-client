module.exports = {
    templateUrl: 'app/create/organization/organization-lookup.html',
    bindings: {
        type: '@',
        organization: '=',
        form: '<'
    },
    controller: function () {
        var self = this;

        this.lookupOrganization = function () {
            self.organization = null;
            self.foundOrganization = null;
        };

        this.organizationSelected = function (organization) {
            if (!organization) {
                return;
            }
            if (organization.id) {
                self.selectedOrganization = organization;
            } else {
                self.organization = organization;
            }
        };

        this.confirmSelectedOrganization = function (confirm) {
            if (confirm) {
                self.organization = self.selectedOrganization;
            }
            self.selectedOrganization = null;
            self.foundOrganization = null;
        };
    }
};
