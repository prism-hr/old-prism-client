module.exports = {
    template: require('./organization-description.html'),
    bindings: {
        type: '@',
        organization: '=',
        form: '<'
    },
    /** @ngInject */
    controller: function () {
        this.clearImage = function () {
            this.documentBackgroundImageOriginal = null;
            this.organization.documentBackgroundImage = null;
            this.organization.pallet = '';
            this.organization.dominant = '';
        };
    }
}
;
