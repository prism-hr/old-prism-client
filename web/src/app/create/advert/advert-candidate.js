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
        const exclusions = this.advert.tags.map(t => t.tag.name);
        return this.Restangular.all('tags').getList({searchTerm: text, exclusions})
            .then(tags => tags.plain());
    }

    transformTag(chip) {
        if (angular.isObject(chip)) {
            return {tag: _.pick(chip, ['accessCode', 'name'])};
        }
        return {tag: {name: chip}};
    }

    isTagSelected(tag) {
        return Boolean(this.advert.tags.find(t => t.tag.name === tag));
    }

    selectTag(tag) {
        const idx = this.advert.tags.findIndex(t => t.tag.name === tag);
        if (idx > -1) {
            this.advert.tags.splice(idx, 1);
        } else {
            this.advert.tags.push({tag: {name: tag}});
        }
        console.log(tag);
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
