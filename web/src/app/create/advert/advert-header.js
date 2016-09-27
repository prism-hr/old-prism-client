module.exports = {
    template: require('./advert-header.html'),
    bindings: {
        advert: '=',
        form: '<'
    },
    /** @ngInject */
    controller: function () {
        this.advert.positionType = this.advert.positionType || 'EMPLOYMENT';
        // TODO fetch location from organization
    }
};
