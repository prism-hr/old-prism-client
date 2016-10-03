class OrganizationDetailsController {
    constructor(definitions) {
        this.definitions = definitions;
    }

    $onInit() {
        function createFilterFor(query) {
            const lowercaseQuery = angular.lowercase(query);

            return function filterFn(industry) {
                return (industry.name.indexOf(lowercaseQuery) === 0) ||
                    (industry.value.indexOf(lowercaseQuery) === 0);
            };
        }

        this.readonly = false;
        this.selectedItem = null;
        this.searchText = null;
        this.querySearch = function (query) {
            return query ? this.industries.filter(createFilterFor(query)) : [];
        };
        this.industries = [
            {value: 'ACCOUNTING', name: 'Accounting'},
            {value: 'AIRLINES_AVIATION', name: 'Airlines/Aviation'},
            {value: 'ALTERNATIVE_DISPUTE_RESOLUTION', name: 'Alternative Dispute Resolution'},
            {value: 'ALTERNATIVE_MEDICINE', name: 'Alternative Medicine'}
        ];
        this.selectedIndustries = [];
        this.autocompleteDemoRequireMatch = true;
        this.transformChip = function (chip) {
            if (angular.isObject(chip)) {
                return chip;
            }
            return {name: chip, type: 'new'};
        };
    }
}

export const OrganizationDetails = {
    template: require('./organization-details.html'),
    bindings: {
        type: '@',
        organization: '=',
        form: '<'
    },
    controller: OrganizationDetailsController
};
