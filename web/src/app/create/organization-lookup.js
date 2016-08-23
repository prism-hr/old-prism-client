module.exports = {
    templateUrl: 'app/create/organization-lookup.html',
    controller: function () {
        var self = this;

        this.cannotFindOrganization = function () {
            self.organization = {};
            self.foundOrganization = null;
        };

        this.lookupOrganization = function () {
            self.organization = null;
        };

        this.organizationSelected = function (organization) {
            self.selectedOrganization = organization;
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
