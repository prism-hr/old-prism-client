module.exports = {
    template: require('./position-advert.html'),
    bindings: {
        form: '<'
    },
    /** @ngInject */
    controller: function () {
        this.clearImage = function () {
            this.position.documentBackgroundImageOriginal = '';
            this.position.documentBackgroundImage = '';
            this.position.pallet = '';
            this.position.dominant = '';

        };
    }
};
