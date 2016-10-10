class OrganizationDetailsController {
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
