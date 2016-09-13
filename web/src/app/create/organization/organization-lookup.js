module.exports = {
    template: require('./organization-lookup.html'),
    bindings: {
        type: '@',
        organization: '=',
        form: '<'
    },
    /** @ngInject */
    controller: function ($scope, $timeout, Restangular) {
        var self = this;
        this.division = false;
        this.addDivision = function (bolean) {
            this.division = bolean;
            if (!bolean) {
                self.organization.division.name = null;
            }
        };

        this.lookupOrganization = function () {
            self.organization.organization = null;
            self.foundOrganization = null;
        };

        this.getOrganizations = function (searchText) {
            return Restangular.all('organizations').getList({searchTerm: searchText})
                .then(function (organizations) {
                    var list = angular.copy(organizations.plain());
                    list.unshift({name: searchText});
                    return list;
                });
        };

        this.organizationSelected = function (organization) {
            if (!organization) {
                return;
            }
            if (organization.id) {
                self.form.foundOrganization.$setValidity('confirmed', false);
                self.selectedOrganization = organization;
            } else {
                $timeout(function () { // problem with removing mask: https://github.com/angular/material/issues/9318
                    self.organization.organization = organization;
                });
            }
        };

        this.confirmSelectedOrganization = function (confirm) {
            if (confirm) {
                self.organization.organization = self.selectedOrganization;
            }
            self.selectedOrganization = null;
            self.foundOrganization = null;
            self.form.foundOrganization.$setValidity('confirmed', true);
        };
    }
};
