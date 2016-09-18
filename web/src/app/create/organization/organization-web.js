module.exports = {
    template: require('./organization-web.html'),
    bindings: {
        type: '@',
        organization: '=',
        form: '<'
    },
    /** @ngInject */
    controller: function () {
        this.sizes = [
            '1 to 9',
            '10 to 49',
            '50 to 99',
            '100 to 499',
            '500 to 999',
            '1000+'
        ];
        this.students = [
            '1 to 9',
            '10 to 49',
            '50 to 99',
            '100 to 199',
            '200 to 299',
            '300+'
        ];
    }
};
