module.exports = {
    templateUrl: 'app/create/organization/organization-category.html',
    bindings: {
        type: '@',
        category: '=',
        form: '<'
    },
    controller: function () {
        this.category = 'EMPLOYER';
    }
};
