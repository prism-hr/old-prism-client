module.exports = {
    template: require('./organization-category.html'),
    bindings: {
        type: '@',
        organization: '=',
        form: '<'
    },
    /** @ngInject */
    controller: function () {
        this.organization.category = this.organization.category || 'EMPLOYER';
    }
};
