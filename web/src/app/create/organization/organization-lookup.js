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
        this.showImplementationName = this.type === 'DEPARTMENT';
        this.editingOrganization = Boolean(this.organization.id);

        this.setView = function (view) {
            this.view = view;
        };

        this.setView('details');
        if (this.organization.id) {
            if (this.organization.name === this.organization.organization.name) {
                this.selectedOrganization = this.organization;
            } else {
                this.selectedOrganization = this.organization.organization;
                this.selectedOrganizationImplementation = this.organization;
            }
        }

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

        this.organizationSelected = function (organization) {
            if (organization.organizationImplementationId) {
                self.requestOrganization = organization;
                self.setView('request');
            } else {
                self.organization.organization = _.pick(organization, ['id', 'name']);
                self.organization.name = organization.name;
                // self.organization.documentLogoImage = {id: organization.documentLogoImageId};
            }
        };

        this.addDepartment = function (organization) {
            if (organization) {
                self.organization.organization = _.pick(organization, ['id', 'name']);
            }
            self.organization.name = null;
            self.showImplementationName = true;
            self.setView('details');
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
            if (implementation.id) {
                self.requestOrganization = implementation;
                implementation.isImplementation = true;
                self.setView('request');
            } else {
                self.organization.name = implementation.name;
            }
        };

        // Rx.createObservableFunction(this, 'implementationNameChanged')
        //     .flatMapLatest(function (name) {
        //         return Restangular.one('organizations', self.organization.organization.id).all('organizationImplementations').getList({searchTerm: name})
        //             .then(function (implementations) {
        //                 return implementations.plain();
        //             });
        //     })
        //     .subscribe(function (results) {
        //         console.log(results);
        //     });

        this.requestAccess = function (organization) {
            var id = organization.organizationImplementationId || organization.id;
            Restangular.one('organizationImplementations', id).one('join').customPUT({})
                .then(function () {
                    $state.go('activities');
                });
        };

        this.startOver = function () {
            self.requestOrganization = null;
            self.selectedOrganization = null;
            self.selectedOrganizationImplementation = null;
            self.organization.organization = self.organization.name = null;
            self.showImplementationName = false;
            self.setView('details');
        };
    }
};
