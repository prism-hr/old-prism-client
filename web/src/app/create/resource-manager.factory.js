/** @ngInject */
module.exports = function ($q, Restangular, Upload) {
    var managers = {};

    function ResourceManager(endpoint, resource) {
        this._resource = resource || {stateComplete: {}};
        this._endpoint = endpoint;
    }

    ResourceManager.prototype.getResource = function () {
        return this._resource;
    };

    ResourceManager.prototype.saveResource = function () {
        var self = this;

        if (!this._endpoint) {
            return $q.when(self._resource);
        }

        var url;
        if (this._resource.id) {
            url = this._endpoint.one(this._resource.id).getRestangularUrl();
        } else {
            url = this._endpoint.getRestangularUrl();
        }
        var resourcePost = angular.copy(_.omit(this._resource, ['state', 'userCreate', 'roles']));
        var logo = resourcePost.documentLogoImage;
        // var background = resourcePost.documentBackgroundImage;
        resourcePost.documentLogoImage = null;
        // resourcePost.documentBackgroundImage = null;
        resourcePost.stateComplete = JSON.stringify(resourcePost.stateComplete);
        return Upload.upload({
            url: url,
            data: {
                data: Upload.json(resourcePost),
                file: logo
            }
        }).then(function (response) {
            if (!self._resource.id) {
                self._resource = {stateComplete: {}};
            }
            return self._resource.id ? self._resource : response.data;
        });
    };

    return {
        getManager: function (id, type) {
            var endpoint = type !== 'POSITION' && Restangular.all('organizationImplementations');
            if (id === 'new') {
                if (!managers[type]) {
                    managers[type] = new ResourceManager(endpoint);
                }
                return $q.when(managers[type]);
            }

            return endpoint.one(id).get()
                .then(function (resource) {
                    resource = resource.plain();
                    resource.stateComplete = resource.stateComplete ? JSON.parse(resource.stateComplete) : {};
                    return new ResourceManager(endpoint, resource);
                });
        }
    };
};
