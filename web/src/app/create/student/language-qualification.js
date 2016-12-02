class LanguageQualificationController {
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

export const LanguageQualification = {
    template: require('./language-qualification.html'),
    bindings: {
        language: '=',
        form: '<'
    },
    controller: LanguageQualificationController
};
