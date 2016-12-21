class AdvertCandidateController {
    private separatorKeys: Array<string>;
    private advert: any;
    private categoriesHelper: any;

    /** @ngInject */
    constructor(private Restangular: Restangular.IService, private checkboxesHelper: any, private definitions: any, private $mdConstant: any) {
        this.separatorKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
    }

    $onInit() {
        this.advert.tags = this.advert.tags || [];
        this.categoriesHelper = this.checkboxesHelper.create(this.definitions.qualificationCategory, this.advert.qualificationCategories, 'qualificationCategory');
    }
}

export const AdvertCandidate = {
    template: require('./advert-candidate.html'),
    bindings: {
        advert: '=',
        wizard: '<'
    },
    controller: AdvertCandidateController
};
