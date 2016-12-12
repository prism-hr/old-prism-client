class LanguageController {
    /** @ngInject */
    constructor(private definitions: any, private $element: any) {
        definitions.loadLanguages();
    }

    $onInit() {
        this.$element.find('input').on('keydown', ev => {
            ev.stopPropagation();
        });
    }

    searchLanguages(searchText: string) {
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
