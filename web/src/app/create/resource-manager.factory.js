/** @ngInject */
module.exports = function ($q, Restangular, Upload) {

    var managers = {};

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
        var background = resourcePost.documentBackgroundImage;
        resourcePost.documentLogoImage = null;
        resourcePost.documentBackgroundImage = null;
        return Upload.upload({
            url: url,
            data: {
                data: Upload.json(resourcePost),
                file: logo
            }
        }).then(function (response) {
            this._resource = {};
            return response.data;
        });
    };

    return {
        getManager: function (id, type) {
            if (id === 'new') {
                if (!managers[type]) {
                    managers[type] = new ResourceManager();
                }
                return $q.when(managers[type]);
            }
            return Restangular.one('organizationImplementations', id).get()
                .then(function (resource) {
                    return new ResourceManager(resource.plain());
                });
        }
    };
};
