/** @ngInject */
export const ResourceManagerFactory = function ($q, Restangular) {
    const typeDefinitions = {
        promoter: {apiCollection: 'organizationImplementations', generatePostData: generateOrganizationPostData},
        department: {apiCollection: 'organizationImplementations', generatePostData: generateOrganizationPostData},
        advert: {apiCollection: 'promotions', generatePostData: generateAdvertPostData},
        student: {apiCollection: 'students'}
    };

    class ResourceManager {
        constructor(type, resource) {
            this._type = type;
            this._resource = resource;
        }

        getResource() {
            return this._resource;
        }

        saveResource() {
            if (this._type === 'student') { // TODO drop these lines when position is ready
                return $q.when(this._resource);
            }

            const collectionName = typeDefinitions[this._type].apiCollection;

            const data = typeDefinitions[this._type].generatePostData(this._resource);
            let promise;
            if (this._resource.accessCode) {
                promise = Restangular.one(collectionName, this._resource.accessCode)
                    .customPUT(data, null, {stateComplete: this._resource.stateComplete});
            } else {
                promise = Restangular.all(collectionName).post(data, {
                    stateComplete: this._resource.stateComplete,
                    context: this._type
                });
            }

            return promise.then(savedResource => {
                savedResource.stateComplete = JSON.parse(savedResource.stateComplete);
                this._resource = savedResource;
                return this._resource;
            });
        }

        commitResource() {
            return Restangular.one(typeDefinitions[this._type].apiCollection, this._resource.accessCode).one('commit').customPUT({})
                .then(response => {
                    this._resource = response.plain();
                    this._resource.stateComplete = JSON.parse(this._resource.stateComplete);
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

            return Restangular.one(typeDefinitions[type].apiCollection, source).get()
                .then(resource => {
                    const r = resource.plain();
                    r.stateComplete = JSON.parse(r.stateComplete);
                    return new ResourceManager(type, r);
                });
        }
    };

    function generateOrganizationPostData(resource) {
        const resourcePost = _.omit(resource, ['state', 'userCreate', 'stateComplete', 'context', 'actions', 'userUpdate']);
        if (resourcePost.tags) {
            resourcePost.tags.forEach(t => {
                t.tag = _.pick(t.tag, ['accessCode', 'name']);
            });
        }
        return resourcePost;
    }

    function generateAdvertPostData(resource) {
        const resourcePost = _.omit(resource, ['state', 'userCreate', 'stateComplete', 'actions', 'organizationImplementations', 'timestampLatestReferral', 'timestampLatestView', 'countActivity', 'countReferral', 'countView', 'countResponse', 'timestampLatestResponse', 'timestampLatestActivity', 'organizationImplementationDisplay', 'userUpdate', 'context', 'tagsSuggested']);
        resourcePost.organizationImplementation = _.pick(resourcePost.organizationImplementation, ['accessCode']);
        if (resourcePost.positionBenefits) {
            resourcePost.positionBenefits.forEach(b => {
                b.positionBenefit = _.pick(b.positionBenefit, ['accessCode', 'name']);
            });
        }
        if (resourcePost.tags) {
            resourcePost.tags.forEach(t => {
                t.tag = _.pick(t.tag, ['accessCode', 'name']);
            });
        }
        return resourcePost;
    }
};
