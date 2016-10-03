class AdvertSalaryController {
    $onInit() {
        // TODO fetch currency from location, interval based on type options
        this.advert.salary = 'RANGE';
        this.advert.currency = 'GBP';
        this.advert.interval = 'YEAR';
        this.selectedOption = '';
        this.searchText = '';
        this.selectedBenefits = {
            types: []
        };

        this.launchBenefits = [
            {value: 'ANNUAL-BONUS', name: 'Annual Bonus'},
            {value: 'TARGET-EARNINGS', name: 'On Target Earnings'},
            {value: 'SHARE-OPTIONS', name: 'Share options'},
            {value: 'PRIVATE-HEALTH', name: 'Private Health Insurance'},
            {value: 'PENSION', name: 'Pension Scheme / Contribution'}
        ];
    }

    transformChip(chip) {
        if (angular.isObject(chip)) {
            return chip;
        }
        return {
            value: chip.toUpperCase().replace(/\s/g, '-'),
            name: chip
        };
    }

    querySearch(query) {
        let finalResults = [];
        if (this.selectedBenefits.types.length > 0) {
            const arrayValue = this.selectedBenefits.types.map(obj => obj.value);
            angular.forEach(query, result => {
                if (arrayValue.indexOf(result.value) < 0) {
                    finalResults.push(result);
                }
            });
        } else {
            finalResults = query;
        }
        return finalResults;
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
