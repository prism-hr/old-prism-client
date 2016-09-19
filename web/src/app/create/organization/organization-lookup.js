module.exports = {
    template: require('./organization-lookup.html'),
    bindings: {
        type: '@',
        organization: '=',
        form: '<'
    },
    /** @ngInject */
    controller: function ($q, $timeout, $state, Restangular) {
        var self = this;

        this.setView = function (view) {
            this.view = view;
        };

        this.setView(this.organization.name ? 'details' : 'lookup');

        this.getOrganizations = function (searchText) {
            return Restangular.all('organizations').getList({searchTerm: searchText})
                .then(function (organizations) {
                    var nameTaken = _.find(organizations, {name: searchText});
                    if (searchText.length >= 2 && !nameTaken) {
                        organizations.unshift({name: searchText});
                    }
                    return organizations;
                });
        };

        this.organizationSelected = function () {
            self.implementationSearchText = null;
            self.selectedOrganizationImplementation = null;
        };

        this.getOrganizationImplementations = function (searchText) {
            var searchPromise;
            if (self.selectedOrganization.id) {
                searchPromise = Restangular.one('organizations', self.selectedOrganization.id).all('organizationImplementations').getList({searchTerm: searchText})
                    .then(function (implementations) {
                        return implementations.plain();
                    });
            } else {
                searchPromise = $q.when([]);
            }

            return searchPromise.then(function (implementations) {
                var nameTaken = _.find(implementations, {name: searchText});
                if (searchText.length >= 2 && !nameTaken) {
                    implementations.unshift({name: searchText});
                }
                return implementations;
            });
        };

        this.organizationImplementationSelected = function (implementation) {
            self.organization.organization = self.selectedOrganization;
            self.organization.name = self.selectedOrganizationImplementation.name;
            self.setView(implementation.id ? 'request' : 'details');
        };

        this.gotoLookup = function () {
            self.selectedOrganization = null;
            self.selectedOrganizationImplementation = null;
            this.setView('lookup');
        };

        this.division = false;
        this.addDivision = function (bolean) {
            this.division = bolean;
            if (!bolean) {
                self.organization.division = null;
            }
        };

        this.requestAccess = function (request) {
            if (request) {
                // request access
            }
            $state.go('activities');
        };
    }
};
