module.exports = {
    template: require('./advert-salary.html'),
    bindings: {
        form: '<',
        advert: '='
    },
    /** @ngInject */
    controller: function () {
        // TODO fetch currency from location, interval based on type options
        this.advert.salary = 'RANGE';
        this.advert.currency = 'GBP';
        this.advert.interval = 'YEAR';
        this.selectedOption = '';
        this.searchText = '';
        this.selectedBenefits = {
            types: []
        };
        this.transformChip = function (chip) {
            if (angular.isObject(chip)) {
                return chip;
            }
            return {
                value: chip.toUpperCase().replace(/\s/g, '-'),
                name: chip
            };
        };
        this.querySearch = function (query) {
            var finalResults = [];
            if (this.selectedBenefits.types.length > 0) {
                var arrayValue = this.selectedBenefits.types.map(function (obj) {
                    return obj.value;
                });
                angular.forEach(query, function (result) {
                    if (arrayValue.indexOf(result.value) < 0) {
                        finalResults.push(result);
                    }
                });
            } else {
                finalResults = query;
            }
            return finalResults;
        };
        this.launchBenefits = [
            {value: 'ANNUAL-BONUS', name: 'Annual Bonus'},
            {value: 'TARGET-EARNINGS', name: 'On Target Earnings'},
            {value: 'SHARE-OPTIONS', name: 'Share options'},
            {value: 'PRIVATE-HEALTH', name: 'Private Health Insurance'},
            {value: 'PENSION', name: 'Pension Scheme / Contribution'}
        ];
    }
};
