class AdvertAudienceController {
    constructor(definitions) {
        this.definitions = definitions;
    }

    $onInit() {
        function createFilterFor(query) {
            const lowercaseQuery = angular.lowercase(query);

            return function filterFn(industry) {
                return (industry._lowername.indexOf(lowercaseQuery) === 0) ||
                    (industry._lowervalue.indexOf(lowercaseQuery) === 0);
            };
        }

        this.readonly = false;
        this.selectedItem = null;
        this.searchText = null;
        this.querySearch = function (query) {
            return query ? self.industries.filter(createFilterFor(query)) : [];
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

        this.studentsTypeAll = true;
        this.studentsUndergraduateAll = true;
        this.studentsMastersAll = true;
        this.studentsResearchAll = true;
        this.studiesTypes = [
            {category: 'Undergraduate Students', name: 'New'},
            {category: 'Undergraduate Students', name: 'Mid Study'},
            {category: 'Undergraduate Students', name: 'Graduating'},
            {category: 'Masters Students', name: 'New'},
            {category: 'Masters Students', name: 'Mid Study'},
            {category: 'Masters Students', name: 'Graduating'},
            {category: 'Research Students', name: 'New'},
            {category: 'Research Students', name: 'Mid Study'},
            {category: 'Research Students', name: 'Graduating'}
        ];
    }
}

export const AdvertAudience = {
    template: require('./advert-audience.html'),
    bindings: {
        advert: '=',
        form: '<'
    },
    controller: AdvertAudienceController
};
