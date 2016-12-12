import * as _ from 'lodash';
import * as angular from 'angular';

class OrganizationDetailsController {
    separatorKeys: Array<string>;
    private organization: any;
    private categoriesHelper: any;

    /** @ngInject */
    constructor(private Restangular: Restangular.IService, private checkboxesHelper: any, private definitions: any, private $mdConstant: any) {
        this.separatorKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
    }

    $onInit() {
        this.categoriesHelper = this.checkboxesHelper.create(this.definitions.qualificationCategory, this.organization.qualificationCategories, 'qualificationCategory');
    }

    lookupTags(text: string) {
        return this.Restangular.all('tags').getList({searchTerm: text})
            .then((tags: Restangular.ICollection) => tags.plain());
    }

    transformTag(chip: any) {
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
