class AdvertCandidateController {
    /** @ngInject */
    constructor(Restangular, $mdConstant) {
        this.Restangular = Restangular;
        this.separatorKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
    }

    $onInit() {
        this.advert.tags = this.advert.tags || [];

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

    lookupTags(text) {
        return this.Restangular.all('tags').getList({searchTerm: text})
            .then(tags => tags.plain());
    }

    transformTag(chip) {
        if (angular.isObject(chip)) {
            return {tag: _.pick(chip, ['accessCode', 'name'])};
        }
        return {tag: {name: chip}};
    }
}

export const AdvertCandidate = {
    template: require('./advert-candidate.html'),
    bindings: {
        advert: '=',
        form: '<'
    },
    controller: AdvertCandidateController
};
