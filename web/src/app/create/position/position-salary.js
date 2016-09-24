module.exports = {
    template: require('./position-salary.html'),
    bindings: {
        form: '<'
    },
    /** @ngInject */
    controller: function () {
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
