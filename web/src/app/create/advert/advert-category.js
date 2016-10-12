class AdvertCategoryController {
    $onInit() {
        this.advert.category = this.advert.category || 'EMPLOYER';
    }
}

export const AdvertCategory = {
    template: require('./advert-category.html'),
    bindings: {
        advert: '=',
        form: '<'
    },
    controller: AdvertCategoryController
};
