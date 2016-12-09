class AdvertCandidateController {
    /** @ngInject */
    constructor(Restangular, checkboxesHelper, definitions, $mdConstant) {
        this.Restangular = Restangular;
        this.checkboxesHelper = checkboxesHelper;
        this.definitions = definitions;
        this.separatorKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
    }

    $onInit() {
        this.advert.tags = this.advert.tags || [];
        this.categoriesHelper = this.checkboxesHelper.create(this.definitions.qualificationCategory, this.advert.qualificationCategories, 'qualificationCategory');
    }

    lookupTags(text) {
        return this.Restangular.all('tags').getList({searchTerm: text})
            .then(tags => tags.plain());
    }

    transformTag(chip) {
        if (angular.isObject(chip)) {
            return {tag: _.pick(chip, ['accessCode', 'name'])};
        }
        return {tag: {name: chip}};
    }
}

export const AdvertCandidate = {
    template: require('./advert-candidate.html'),
    bindings: {
        advert: '=',
        form: '<'
    },
    controller: AdvertCandidateController
};
