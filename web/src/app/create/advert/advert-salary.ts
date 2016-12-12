import * as _ from 'lodash';
import * as angular from 'angular';

class AdvertSalaryController {
    private separatorKeys: Array<string>;
    private advert: any;
    private showBenefits: boolean;

    /** @ngInject */
    constructor(private Restangular: Restangular.IService, private $mdConstant: any, private definitions: any) {
        this.separatorKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
    }

    $onInit() {
        this.advert.positionSalary = this.advert.positionSalary || 'RANGE';
        this.advert.positionSalaryCurrency = this.advert.positionSalaryCurrency || 'GBP';
        this.advert.positionSalaryInterval = this.advert.positionSalaryInterval || 'YEAR';
        if (this.advert.positionBenefits.length > 0 || this.advert.positionBenefitDescription) {
            this.showBenefits = true;
        }
    }

    lookupBenefits(text: string) {
        return this.Restangular.all('positionBenefits').getList({searchTerm: text})
            .then((tags: Restangular.ICollection) => tags.plain());
    }

    transformBenefit(chip: any) {
        if (angular.isObject(chip)) {
            return {positionBenefit: _.pick(chip, ['id', 'name'])};
        }
        return {positionBenefit: {name: chip}};
    }
}

export const AdvertSalary = {
    template: require('./advert-salary.html'),
    bindings: {
        form: '<',
        advert: '='
    },
    controller: AdvertSalaryController
};
