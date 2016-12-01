/** @ngInject */
export class DefinitionsService {
    constructor(Restangular) {
        this.Restangular = Restangular;
    }

    loadDefinitions() {
        if (!this.definitionsPromise) {
            this.definitionsPromise = this.Restangular.one('public', 'definitions').get()
                .then(definitions => {
                    _.assign(this, definitions.plain());
                    return definitions.plain();
                });
        }
        return this.definitionsPromise;
    }

    loadLanguages() {
        if (!this.languagesPromise) {
            this.languagesPromise = this.Restangular.all('languages').getList()
                .then(languages => {
                    this.languages = languages.plain();
                    return this.languages;
                });
        }
        return this.languagesPromise;
    }
}

