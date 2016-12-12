import * as _ from 'lodash';

export class DefinitionsService {
    definitionsPromise: angular.IPromise<any>;
    languagesPromise: angular.IPromise<any>;
    languages: any;

    /** @ngInject */
    constructor(public Restangular: Restangular.IService) {
    }

    loadDefinitions() {
        if (!this.definitionsPromise) {
            this.definitionsPromise = this.Restangular.one('public', 'definitions').get()
                .then((definitions: any) => {
                    _.assign(this, definitions.plain());
                    return definitions.plain();
                });
        }
        return this.definitionsPromise;
    }

    loadLanguages() {
        if (!this.languagesPromise) {
            this.languagesPromise = this.Restangular.all('languages').getList()
                .then((languages: Restangular.ICollection) => {
                    this.languages = languages.plain().map((l: any) => ({accessCode: l.accessCode, name: l.name}));
                    return this.languages;
                });
        }
        return this.languagesPromise;
    }
}

