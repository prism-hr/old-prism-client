module.exports = {
    templateUrl: 'app/create/employer/employer-step1.html',
    controller: function () {
        var self = this;

        this.cannotFindOrganization = function () {
            self.organization = {};
        };

        this.lookupOrganization = function () {
            self.organization = null;
        };

        this.organizationSelected = function (organization) {
            self.selectedOrganization = organization;
        };

        this.confirmSelectedInstitution = function (confirm) {
            if (confirm) {
                self.organization = self.selectedOrganization;
            }
            self.selectedOrganization = null;
        };
    }
};
