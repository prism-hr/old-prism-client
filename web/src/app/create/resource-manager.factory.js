/** @ngInject */
module.exports = function ($q, Restangular, Upload) {
    var collectionNames = {
        PROMOTER: 'organizationImplementations',
        DEPARTMENT: 'organizationImplementations',
        ADVERT: 'adverts',
        STUDENT: 'students'
    };

    function ResourceManager(type, resource) {
        this._resource = resource || {};
        this._type = type;
    }

    ResourceManager.prototype.getResource = function () {
        return this._resource;
    };

    ResourceManager.prototype.saveResource = function (step, options) {
        var self = this;
        options = options || {};

        if (this._type === 'ADVERT') { // TODO drop these lines when advert is ready
            return $q.when(self._resource);
        }

        var collectionName = collectionNames[this._type];
        var url;
        if (this._resource.id) {
            url = Restangular.one(collectionName, this._resource.id).getRestangularUrl();
        } else {
            url = Restangular.all(collectionName).getRestangularUrl();
        }

        var logo = null;
        var background = null;
        var resourcePost = _.omit(this._resource, ['state', 'userCreate', 'roles', 'stateComplete', 'context', 'actions']);

        if (this._resource.documentLogoImage instanceof Blob) {
            resourcePost.documentLogoImage = null;
            logo = this._resource.documentLogoImage;
        }
        if (this._resource.documentBackgroundImage instanceof Blob) {
            resourcePost.documentBackgroundImage = null;
            logo = this._resource.documentBackgroundImage;
        }

        resourcePost = angular.copy(resourcePost);
        return Upload.upload({
            url: url,
            data: {
                section: step,
                context: self._type,
                skipped: options.skipped || false,
                data: Upload.json(resourcePost),
                logo: logo,
                background: background
            }
        }).then(function (response) {
            if (self._resource.id) {
                self._resource = response.data;
            } else {
                self._resource = {};
            }
            return response.data;
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
