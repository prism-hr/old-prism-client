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
            this.organization.documentBackgroundImageOriginal = '';
            this.organization.documentBackgroundImage = '';
            this.organization.pallet = '';
            this.organization.dominant = '';
        };
    }
}
;
