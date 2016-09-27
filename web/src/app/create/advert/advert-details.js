module.exports = {
    template: require('./advert-details.html'),
    bindings: {
        form: '<',
        advert: '='
    },
    /** @ngInject */
    controller: function () {
        this.clearImage = function () {
            this.position.documentBackgroundImageOriginal = '';
            this.position.documentBackgroundImage = '';
        };
    }
};
