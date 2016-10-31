class AdvertSalaryController {
    /** @ngInject */
    constructor(Restangular, definitions) {
        this.Restangular = Restangular;
        this.definitions = definitions;
    }

    $onInit() {
        // TODO fetch currency from location, interval based on type options
        this.advert.positionSalary = this.advert.positionSalary || 'RANGE';
        this.advert.positionSalaryCurrency = this.advert.positionSalaryCurrency || 'GBP';
        this.advert.positionSalaryInterval = this.advert.positionSalaryInterval || 'YEAR';
        if (this.advert.positionBenefits.length > 0 || this.advert.positionBenefitDescription) {
            this.showBenefits = true;
        }
    }

    lookupBenefits(text) {
        return this.Restangular.all('positionBenefits').getList({searchTerm: text})
            .then(tags => tags.plain());
    }

    transformBenefit(chip) {
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
