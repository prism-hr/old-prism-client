/** @ngInject */
module.exports = function ($q, Restangular, Upload) {
    var managers = {};
    var collectionNames = {
        PROMOTER: 'organizationImplementations',
        DEPARTMENT: 'organizationImplementations',
        POSITION: 'positions'
    };

    function ResourceManager(type, resource) {
        this._resource = resource || {};
        this._type = type;
    }

    ResourceManager.prototype.getResource = function () {
        return this._resource;
    };

    ResourceManager.prototype.saveResource = function (step) {
        var self = this;

        if (this._type === 'POSITION') { // TODO drop these lines when position is ready
            return $q.when(self._resource);
        }

        var collectionName = collectionNames[this._type];
        var url;
        if (this._resource.id) {
            url = Restangular.one(collectionName, this._resource.id).getRestangularUrl();
        } else {
            url = Restangular.all(collectionName).getRestangularUrl();
        }
        var resourcePost = angular.copy(_.omit(this._resource, ['state', 'userCreate', 'roles', 'stateComplete', 'context', 'actions']));
        var logo = resourcePost.documentLogoImage;
        var background = resourcePost.documentBackgroundImage;
        resourcePost.documentLogoImage = null;
        resourcePost.documentBackgroundImage = null;
        return Upload.upload({
            url: url,
            data: {
                section: step,
                context: self._type,
                data: Upload.json(resourcePost),
                logo: logo,
                background: background
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
                return $q.when(new ResourceManager(type));
            }

            return Restangular.one(collectionNames[type], id).get()
                .then(function (resource) {
                    return new ResourceManager(type, resource.plain());
                });
        }
    };
};
