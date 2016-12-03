class LanguageController {
    /** @ngInject */
    constructor(definitions, $element) {
        this.definitions = definitions;
        this.$element = $element;
        definitions.loadLanguages();
    }

    $onInit() {
        this.$element.find('input').on('keydown', ev => {
            ev.stopPropagation();
        });
    }

    searchLanguages(searchText) {
        searchText = searchText.toLowerCase();
        return this.definitions.languages.filter(d => {
            return d.name.toLowerCase().includes(searchText);
        });
    }
}

export const Language = {
    template: require('./language.html'),
    bindings: {
        language: '=',
        form: '<'
    },
    controller: LanguageController
};
