/** @ngInject */
module.exports = function ($q, Restangular, Upload) {
    var managers = {};
    var collectionNames = {
        'PROMOTER': 'organizationImplementations',
        'DEPARTMENT': 'organizationImplementations',
        'POSITION': 'positions'
    };

    function ResourceManager(type, resource) {
        this._resource = resource || {stateComplete: {}};
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
        var resourcePost = angular.copy(_.omit(this._resource, ['state', 'userCreate', 'roles']));
        var logo = resourcePost.documentLogoImage;
        // var background = resourcePost.documentBackgroundImage;
        resourcePost.documentLogoImage = null;
        // resourcePost.documentBackgroundImage = null;
        resourcePost.stateComplete = JSON.stringify(resourcePost.stateComplete);
        return Upload.upload({
            url: url,
            data: {
                section: step,
                context: self._type,
                drafting: true,
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
            if (id === 'new') {
                if (!managers[type]) {
                    managers[type] = new ResourceManager(type);
                }
                return $q.when(managers[type]);
            }

            return Restangular.one(collectionNames[type], id).get()
                .then(function (resource) {
                    resource = resource.plain();
                    resource.stateComplete = resource.stateComplete ? JSON.parse(resource.stateComplete) : {};
                    return new ResourceManager(type, resource);
                });
        }
    };
};
