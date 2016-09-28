module.exports = {
    template: require('./organization-assets.html'),
    bindings: {
        type: '@',
        organization: '=',
        form: '<'
    },
    /** @ngInject */
    controller: function () {
        this.clearImage = function () {
            this.organization.documentBackgroundImageOriginal = '';
            this.organization.documentBackgroundImage = '';
            this.organization.pallet = '';
            this.organization.dominant = '';
        };
    }
}
;
