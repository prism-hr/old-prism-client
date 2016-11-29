class OrganizationDetailsController {
    /** @ngInject */
    constructor(Restangular, definitions) {
        this.definitions = definitions;
        this.Restangular = Restangular;
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

    isQualificationCategorySelected(category) {
        return this.organization.qualificationCategories.findIndex(c => c.qualificationCategory === category) > -1;
    }

    toggleQualificationCategory(category) {
        const array = this.organization.qualificationCategories;
        const idx = array.findIndex(c => c.qualificationCategory === category);
        if (idx > -1) {
            array.splice(idx, 1);
        } else {
            array.push({qualificationCategory: category});
        }
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
