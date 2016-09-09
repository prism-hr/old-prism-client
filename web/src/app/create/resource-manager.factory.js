/** @ngInject */
module.exports = function ($q, Restangular, Upload) {
    var newResourceManager = new ResourceManager();

    function ResourceManager(resource) {
        this._resource = resource || {};
    }

    ResourceManager.prototype.getResource = function () {
        return this._resource;
    };

    ResourceManager.prototype.saveResource = function (resource) {
        var url;
        if (resource.id) {
            url = Restangular.one('organizationImplementations', resource.id).getRestangularUrl();
        } else {
            url = Restangular.all('organizationImplementations').getRestangularUrl();
        }
        var resourcePost = angular.copy(_.omit(resource, ['state', 'userCreate']));
        var logo = resourcePost.documentLogoImage;
        resourcePost.documentLogoImage = null;
        return Upload.upload({
            url: url,
            data: {
                data: Upload.json(resourcePost),
                file: logo
            }
        }).then(function (response) {
            this._resource = {};
            return response;
        });
    };

    return {
        getManager: function (id) {
            if (id === 'new') {
                return $q.when(newResourceManager);
            }
            return Restangular.one('organizationImplementations', id).get()
                .then(function (resource) {
                    return new ResourceManager(resource.plain());
                });
        }
    };
};
