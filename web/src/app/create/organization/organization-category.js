module.exports = {
    template: require('./organization-category.html'),
    bindings: {
        type: '@',
        category: '=',
        form: '<'
    },
    /** @ngInject */
    controller: function () {
        this.category = 'EMPLOYER';
    }
};
