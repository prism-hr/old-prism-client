/** @ngInject */
export const resourceManagerFactory = function ($q, Restangular, Upload, fileConversion) {
    const collectionNames = {
        PROMOTER: 'organizationImplementations',
        DEPARTMENT: 'organizationImplementations',
        ADVERT: 'promotions',
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
            if (this._resource.accessCode) {
                url = Restangular.one(collectionName, this._resource.accessCode).getRestangularUrl();
            } else {
                url = Restangular.all(collectionName).getRestangularUrl();
            }

            let resourcePost = _.omit(this._resource, ['state', 'userCreate', 'roles', 'stateComplete', 'context', 'actions']);

            let logo = null;
            let background = null;
            if (this._resource.documentLogoImage instanceof Blob) {
                resourcePost.documentLogoImage = null;
                logo = this._resource.documentLogoImage;
            }
            if (this._resource.documentBackgroundImage instanceof Blob) {
                resourcePost.documentBackgroundImage = null;
                background = this._resource.documentBackgroundImage;
            }
            resourcePost = fileConversion.processForUpload(angular.copy(resourcePost));

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
                const savedResource = fileConversion.processForDisplay(response.data);
                if (this._resource.accessCode) {
                    this._resource = savedResource;
                } else {
                    this._resource = {};
                }
                return savedResource;
            });
        }

        commitResource() {
            return Restangular.one(collectionNames[this._type], this._resource.accessCode).one('commit').customPUT({})
                .then(response => {
                    this._resource = fileConversion.processForDisplay(response.plain());
                    return this._resource;
                });
        }
    }

    return {
        /**
         * Creates new resource manager
         *
         * @param {string|object} source id of resource, or initial resource object
         * @param type type of manager
         * @return {ResourceManager} created manager
         */
        getManager(source, type) {
            if (angular.isObject(source)) {
                return $q.when(new ResourceManager(type, source));
            }

            return Restangular.one(collectionNames[type], source).get()
                .then(resource => {
                    const r = resource.plain();
                    return new ResourceManager(type, fileConversion.processForDisplay(r));
                });
        }
    };
};
