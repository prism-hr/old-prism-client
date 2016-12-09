class OrganizationDetailsController {
    /** @ngInject */
    constructor(Restangular, checkboxesHelper, definitions, $mdConstant) {
        this.Restangular = Restangular;
        this.checkboxesHelper = checkboxesHelper;
        this.definitions = definitions;
        this.separatorKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
    }

    $onInit() {
        this.categoriesHelper = this.checkboxesHelper.create(this.definitions.qualificationCategory, this.organization.qualificationCategories, 'qualificationCategory');
    }

    lookupTags(text) {
        return this.Restangular.all('tags').getList({searchTerm: text})
            .then(tags => tags.plain());
    }

    transformTag(chip) {
        if (angular.isObject(chip)) {
            return {tag: _.pick(chip, ['id', 'name'])};
        }
        return {tag: {name: chip}};
    }
}

export const OrganizationDetails = {
    template: require('./organization-details.html'),
    bindings: {
        wizardType: '@',
        organization: '=',
        form: '<'
    },
    controller: OrganizationDetailsController
};
