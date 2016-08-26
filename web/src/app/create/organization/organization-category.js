module.exports = {
    templateUrl: 'app/create/organization/organization-category.html',
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
