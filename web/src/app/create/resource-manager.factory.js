/** @ngInject */
module.exports = function ($q, Restangular, Upload) {
    var managers = {};

    function ResourceManager(resource) {
        this._resource = resource;
    }

    ResourceManager.prototype.getResource = function () {
        return this._resource;
    };

    ResourceManager.prototype.saveResource = function () {
        var self = this;
        var url;
        if (this._resource.id) {
            url = Restangular.one('organizationImplementations', this._resource.id).getRestangularUrl();
        } else {
            url = Restangular.all('organizationImplementations').getRestangularUrl();
        }
        var resourcePost = angular.copy(_.omit(this._resource, ['state', 'userCreate']));
        var logo = resourcePost.documentLogoImage;
        var background = resourcePost.documentBackgroundImage;
        resourcePost.documentLogoImage = null;
        resourcePost.documentBackgroundImage = null;
        resourcePost.stateComplete = JSON.stringify(resourcePost.stateComplete);
        return Upload.upload({
            url: url,
            data: {
                data: Upload.json(resourcePost),
                file: logo
            }
        }).then(function (response) {
            if (!self._resource.id) {
                self._resource = {};
            }
            return self._resource.id ? self._resource : response.data;
        });
    };

    return {
        getManager: function (id, type) {
            if (id === 'new') {
                if (!managers[type]) {
                    managers[type] = new ResourceManager({stateComplete: {}});
                }
                return $q.when(managers[type]);
            }
            return Restangular.one('organizationImplementations', id).get()
                .then(function (resource) {
                    resource = resource.plain();
                    resource.stateComplete = JSON.parse(resource.stateComplete);
                    return new ResourceManager(resource);
                });
        }
    };
};
