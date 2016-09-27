module.exports = {
    template: require('./advert-category.html'),
    bindings: {
        advert: '=',
        form: '<'
    },
    /** @ngInject */
    controller: function () {
        this.advert.category = this.advert.category || 'EMPLOYER';
    }
};
