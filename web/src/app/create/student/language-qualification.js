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
}

export const LanguageQualification = {
    template: require('./language-qualification.html'),
    bindings: {
        language: '='
    },
    controller: LanguageQualificationController
};
