/** @ngInject */
export class DefinitionsService {
    constructor(Restangular) {
        this.Restangular = Restangular;
    }

    loadDefinitions() {
        if (!this.loadPromise) {
            this.loadPromise = this.Restangular.one('public', 'definitions').get()
                .then(definitions => {
                    _.assign(this, definitions.plain());
                    return definitions.plain();
                });
        }
        return this.loadPromise;
    }
}

