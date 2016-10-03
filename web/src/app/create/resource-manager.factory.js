/** @ngInject */
export const resourceManagerFactory = function ($q, Restangular, Upload) {
    const collectionNames = {
        PROMOTER: 'organizationImplementations',
        DEPARTMENT: 'organizationImplementations',
        ADVERT: 'adverts',
        STUDENT: 'students'
    };

    class ResourceManager {
        constructor(type, resource) {
            this._resource = resource || {};
            this._type = type;
        }

        getResource() {
            return this._resource;
        }

        saveResource(step, options) {
            options = options || {};

            if (this._type === 'ADVERT') { // TODO drop these lines when advert is ready
                return $q.when(this._resource);
            }

            const collectionName = collectionNames[this._type];
            let url;
            if (this._resource.id) {
                url = Restangular.one(collectionName, this._resource.id).getRestangularUrl();
            } else {
                url = Restangular.all(collectionName).getRestangularUrl();
            }

            let logo = null;
            let background = null;
            let resourcePost = _.omit(this._resource, ['state', 'userCreate', 'roles', 'stateComplete', 'context', 'actions']);

            if (this._resource.documentLogoImage instanceof Blob) {
                resourcePost.documentLogoImage = null;
                logo = this._resource.documentLogoImage;
            }
            if (this._resource.documentBackgroundImage instanceof Blob) {
                resourcePost.documentBackgroundImage = null;
                background = this._resource.documentBackgroundImage;
            }

            resourcePost = angular.copy(resourcePost);
            return Upload.upload({
                url,
                data: {
                    section: step,
                    context: this._type,
                    skipped: options.skipped || false,
                    data: Upload.json(resourcePost),
                    logo,
                    background
                }
            }).then(response => {
                if (this._resource.id) {
                    this._resource = response.data;
                } else {
                    this._resource = {};
                }
                return response.data;
            });
        }
    }

    return {
        getManager(id, type) {
            if (id === 'new') {
                return $q.when(new ResourceManager(type));
            }

            return Restangular.one(collectionNames[type], id).get()
                .then(resource => new ResourceManager(type, resource.plain()));
        }
    };
};
